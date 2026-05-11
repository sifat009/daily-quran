import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (req as any).body || await req.json();
    const { email } = typeof body === 'string' ? JSON.parse(body) : body;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
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

    return new Response(JSON.stringify({
      message: 'Successfully subscribed! You will receive your daily Ayah starting tomorrow.',
      subscriber: data?.[0],
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
