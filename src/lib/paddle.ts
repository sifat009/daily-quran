import { initializePaddle, Paddle } from '@paddle/paddle-js';

let paddlePromise: Promise<Paddle | undefined> | null = null;

/**
 * Initializes and retrieves the singleton Paddle instance.
 * Automatically resolves the environment based on token structure or environment config.
 */
export function getPaddleInstance(): Promise<Paddle | undefined> {
	if (paddlePromise) return paddlePromise;

	const token = import.meta.env.VITE_PADDLE_CLIENT_TOKEN;
	const env = import.meta.env.VITE_PADDLE_ENVIRONMENT || (token?.startsWith('test_') ? 'sandbox' : 'production');

	if (!token) {
		console.warn('Paddle client token is missing. Please configure VITE_PADDLE_CLIENT_TOKEN.');
		paddlePromise = Promise.resolve(undefined);
		return paddlePromise;
	}

	paddlePromise = initializePaddle({
		environment: env as 'sandbox' | 'production',
		token: token,
		eventCallback: (event) => {
			const eventName = event.name as string;
			if (eventName === 'checkout.warning') {
				console.warn('Paddle Checkout warning:', event.data);
			} else if (eventName === 'checkout.error') {
				console.error('Paddle Checkout error:', event.data);
			} else {
				console.log('Paddle Checkout event:', event.name, event.data);
			}
		}
	}).catch((err) => {
		console.error('Failed to initialize Paddle:', err);
		paddlePromise = null; // Allow retry on subsequent attempts
		return undefined;
	});

	return paddlePromise;
}

interface OpenCheckoutOptions {
	priceId?: string;
	email?: string;
}

/**
 * Opens the Paddle checkout overlay.
 * Throws errors if SDK is not initialized or pricing is not configured.
 */
export async function openPaddleCheckout({ priceId, email }: OpenCheckoutOptions = {}) {
	const paddle = await getPaddleInstance();
	if (!paddle) {
		throw new Error('PADDLE_NOT_INITIALIZED');
	}

	const targetPriceId = priceId || import.meta.env.VITE_PADDLE_PRICE_ID;
	if (!targetPriceId) {
		throw new Error('PADDLE_PRICE_ID_MISSING');
	}

	paddle.Checkout.open({
		items: [
			{
				priceId: targetPriceId,
				quantity: 1,
			},
		],
		customer: email ? { email } : undefined,
	});
}
