import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const config = {
	maxDuration: 60,
};

export default async function handler(req: any, res: any) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const token = req.query.token;

		if (!token) {
			return res.status(400).json({ error: 'Token required' });
		}

		// 1. Find the subscriber with this token to get their email
		const { data: subData, error: findError } = await supabase
			.from('subscribers')
			.select('email')
			.eq('unsubscribe_token', token)
			.single();

		if (findError || !subData) {
			return res.status(404).json({ error: 'Invalid or expired token' });
		}

		const { error } = await supabase
			.from('subscribers')
			.update({ is_active: false })
			.eq('email', subData.email)
			.select();

		if (error) throw error;

		res.setHeader('Content-Type', 'text/html');
		return res.status(200).send(
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
    `,
			{
				status: 200,
				headers: { 'Content-Type': 'text/html' },
			},
		);
	} catch (error: any) {
		return res.status(500).json({
			error: 'Internal server error',
			details: error.message,
		});
	}
}
