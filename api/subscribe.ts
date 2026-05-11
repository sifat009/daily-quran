import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body || {};

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const unsubscribeToken = crypto.randomUUID();

    // Try to insert or update (upsert)
    const { data, error } = await supabase
      .from('subscribers')
      .upsert(
        { email: normalizedEmail, is_active: true, unsubscribe_token: unsubscribeToken },
        { onConflict: 'email' }
      )
      .select();

    if (error) throw error;

    return res.status(200).json({
      message: 'Successfully subscribed! You will receive your daily Ayah starting tomorrow.',
      subscriber: data?.[0],
    });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
