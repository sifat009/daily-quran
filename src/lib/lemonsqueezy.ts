export const initializeLemonSqueezy = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (window.createLemonSqueezy) {
			window.createLemonSqueezy();
			resolve();
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://assets.lemonsqueezy.com/lemon.js';
		script.async = true;
		script.defer = true;

		script.onload = () => {
			if (window.createLemonSqueezy) {
				window.createLemonSqueezy();
				resolve();
			} else {
				reject(new Error('Lemon Squeezy failed to initialize.'));
			}
		};

		script.onerror = () => {
			reject(new Error('Failed to load Lemon Squeezy script.'));
		};

		document.body.appendChild(script);
	});
};

// Add types to window
declare global {
	interface Window {
		createLemonSqueezy: () => void;
		LemonSqueezy: {
			Url: {
				Open: (url: string) => void;
				Close: () => void;
			};
			Setup: (options: any) => void;
		};
	}
}
