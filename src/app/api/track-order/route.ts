import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { orderId, email } = await request.json();

    if (!orderId || !email) {
      return NextResponse.json({ error: 'Order ID and Email are required' }, { status: 400 });
    }

    const WC_KEY = process.env.WC_CONSUMER_KEY;
    const WC_SECRET = process.env.WC_CONSUMER_SECRET;
    
    if (!WC_KEY || !WC_SECRET) {
      return NextResponse.json({ error: 'Server misconfiguration: WooCommerce API keys are missing' }, { status: 500 });
    }

    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
    
    // Strip # from orderId if user included it
    const cleanOrderId = orderId.toString().replace('#', '').trim();

    const wcRes = await fetch(`https://api.kaajofficial.com/wp-json/wc/v3/orders/${cleanOrderId}`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${auth}`
      }
    });

    if (wcRes.status === 404) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    if (!wcRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch order details from store.' }, { status: 500 });
    }

    const wcData = await wcRes.json();

    // Verify the email address matches to prevent unauthorized viewing of orders
    const billingEmail = wcData.billing?.email?.toLowerCase().trim();
    const providedEmail = email.toLowerCase().trim();

    if (billingEmail !== providedEmail) {
      return NextResponse.json({ error: 'The email address provided does not match the billing email for this order.' }, { status: 401 });
    }

    // Success! Return the safe data back to the client
    return NextResponse.json({
      success: true,
      order: {
        id: wcData.id,
        status: wcData.status,
        date_created: wcData.date_created,
        total: wcData.total,
        currency: wcData.currency,
        billing: {
          first_name: wcData.billing.first_name,
          last_name: wcData.billing.last_name,
        }
      }
    });

  } catch (error) {
    console.error('Track Order API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred while looking up your order.' }, { status: 500 });
  }
}
