import { createClient } from '@supabase/supabase-js';
import type { IncomingMessage, ServerResponse } from 'http';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

type VercelRequest = IncomingMessage & {
  body?: any;
  query?: Record<string, string | string[]>;
};

type VercelResponse = ServerResponse & {
  json: (body: any) => VercelResponse;
  send: (body: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
	if (request.method !== 'POST') {
		return response.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const { email } = request.body;

		if (!email || !email.includes('@')) {
			return response.status(400).json({ error: 'Valid email required' });
		}

		const unsubscribeToken = crypto.randomUUID();

		const { data, error } = await supabase
			.from('subscribers')
			.insert([{ email, unsubscribe_token: unsubscribeToken }])
			.select();

		if (error) {
			if (error.code === '23505') {
				return response.status(409).json({ error: 'Email already subscribed' });
			}
			throw error;
		}

		return response.status(200).json({
			message: 'Successfully subscribed! Check your email tomorrow.',
			subscriber: data[0],
		});
	} catch (error) {
		console.error('Subscription error:', error);
		return response.status(500).json({ error: 'Internal server error' });
	}
}
