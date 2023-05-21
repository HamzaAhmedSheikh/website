import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    // Fetch the current counter value from KV or initialize it as 0
    const currentValue: any = await kv.get('counter');

    // Increment the counter value by 1
    const newCounter = currentValue + 1;

    // Store the updated counter value in KV
    await kv.set('counter', newCounter);

    console.log('New Counter:', newCounter);

    return new Response(JSON.stringify({ counter: newCounter }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update counter' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function GET() {
    const user = await kv.get('counter');
    return new Response(JSON.stringify({ counter: user }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }