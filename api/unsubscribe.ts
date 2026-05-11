import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const config = {
  maxDuration: 60,
};

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    console.log('Unsubscribe request received:', req.url);
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Find the subscriber with this token to get their email
    console.log('Finding subscriber with token:', token);
    const { data: subData, error: findError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('unsubscribe_token', token)
      .single();

    if (findError || !subData) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Unsubscribing email:', subData.email);
    const { data, error } = await supabase
      .from('subscribers')
      .update({ is_active: false })
      .eq('email', subData.email)
      .select();

    if (error) throw error;

    return new Response(
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
      }
    );
  } catch (error: any) {
    console.error('Unsubscribe error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
