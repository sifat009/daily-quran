import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(request: VercelRequest, response: VercelResponse) {
	if (request.method !== 'GET') {
		return response.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const token = request.query.token as string;

		if (!token) {
			return response.status(400).json({ error: 'Token required' });
		}

		const { data, error } = await supabase
			.from('subscribers')
			.update({ is_active: false })
			.eq('unsubscribe_token', token)
			.select();

		if (error) throw error;

		if (!data || data.length === 0) {
			return response.status(404).json({ error: 'Invalid token' });
		}

		return response.send(
			`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .success { color: #22c55e; }
          </style>
        </head>
        <body>
          <h1 class="success">Successfully Unsubscribed</h1>
          <p>You will no longer receive daily Ayah emails.</p>
          <p>You can always subscribe again from our website.</p>
        </body>
      </html>
    `
		);
	} catch (error) {
		console.error('Unsubscribe error:', error);
		return response.status(500).json({ error: 'Internal server error' });
	}
}
