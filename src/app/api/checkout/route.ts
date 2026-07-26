import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { form, cart, shipping, total } = data;

    if (!form || !form.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Send Order to WooCommerce REST API
    const WC_KEY = process.env.WC_CONSUMER_KEY;
    const WC_SECRET = process.env.WC_CONSUMER_SECRET;
    let finalOrderId = data.orderNumber; // Fallback to frontend generated string

    if (WC_KEY && WC_SECRET) {
      const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
      
      const wcPayload = {
        payment_method: "cod",
        payment_method_title: "Cash on Delivery",
        set_paid: false,
        billing: {
          first_name: form.firstName,
          last_name: form.lastName,
          address_1: form.address,
          city: form.city,
          state: form.province,
          postcode: form.postcode || "",
          country: "PK",
          email: form.email,
          phone: form.phone
        },
        shipping: {
          first_name: form.firstName,
          last_name: form.lastName,
          address_1: form.address,
          city: form.city,
          state: form.province,
          postcode: form.postcode || "",
          country: "PK"
        },
        line_items: cart.map((item: any) => {
          const decodeId = (gqlId?: string) => {
            if (!gqlId) return undefined;
            try {
              const decoded = Buffer.from(gqlId, 'base64').toString('utf8');
              const match = decoded.match(/\d+$/);
              return match ? parseInt(match[0], 10) : undefined;
            } catch (e) {
              return undefined;
            }
          };

          return {
            product_id: decodeId(item.productId) || 0,
            variation_id: decodeId(item.variationId),
            quantity: item.quantity
          };
        }),
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Shipping",
            total: shipping.toString()
          }
        ]
      };

      const wcRes = await fetch("https://api.kaajofficial.com/wp-json/wc/v3/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`
        },
        body: JSON.stringify(wcPayload)
      });

      if (wcRes.ok) {
        const wcData = await wcRes.json();
        finalOrderId = `#${wcData.id}`;
      } else {
        console.error("WooCommerce order creation failed:", await wcRes.text());
      }
    }

    // 2. Hostinger Mail API Config
    const HOSTINGER_API_KEY = process.env.HOSTINGER_API_KEY || "f982c94a7c9a6135a03909e7d118ddb853433531b21f4f1357609d72ada5dba4";
    const MAILBOX_ID = process.env.HOSTINGER_MAILBOX_ID || "AC5ecff592b2c510d1d1e30c90b10f";

    if (HOSTINGER_API_KEY && MAILBOX_ID) {
      const { Configuration, SendApi } = require('hostinger-mail-api-sdk');
      const config = new Configuration({ accessToken: HOSTINGER_API_KEY });
      const client = new SendApi(config);

      // Generate HTML for cart items
      const itemsHtml = cart.map((item: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #E5E5E5;">
            <strong>${item.name}</strong> x ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #E5E5E5; text-align: right;">
            Rs. ${(item.price * item.quantity).toLocaleString()}
          </td>
        </tr>
      `).join('');

      // Build the email HTML (Minimal, Luxury style)
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 24px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; margin: 0;">KAAJ</h1>
            <p style="font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: #666; margin-top: 5px;">Order Confirmation</p>
          </div>
          
          <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px;">Thank you for your order, ${form.firstName}!</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            Your order <strong>${finalOrderId}</strong> has been received and is now being processed. Our team will contact you shortly for confirmation.
          </p>
          
          <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #E5E5E5; padding-bottom: 10px; margin-bottom: 20px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            ${itemsHtml}
            <tr>
              <td style="padding: 10px; text-align: right; color: #666;">Subtotal</td>
              <td style="padding: 10px; text-align: right; color: #666;">Rs. ${(total - shipping).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: right; color: #666;">Shipping</td>
              <td style="padding: 10px; text-align: right; color: #666;">${shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; text-align: right; font-size: 18px;">Total</td>
              <td style="padding: 10px; font-weight: bold; text-align: right; font-size: 18px;">Rs. ${total.toLocaleString()}</td>
            </tr>
          </table>

          <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #E5E5E5; padding-bottom: 10px; margin-bottom: 20px;">Delivery Details</h3>
          <p style="color: #666; line-height: 1.6;">
            <strong>${form.firstName} ${form.lastName}</strong><br>
            ${form.address}<br>
            ${form.city}, ${form.province} ${form.postcode || ''}<br>
            Phone: ${form.phone}<br>
            Method: Cash on Delivery
          </p>

          <div style="margin-top: 50px; text-align: center; border-top: 1px solid #E5E5E5; padding-top: 30px;">
            <p style="font-size: 12px; color: #999;">If you have any questions, please reply to this email.</p>
            <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; margin-top: 20px;">KAAJ OFFICIAL STORE</p>
          </div>
        </div>
      `;

      // 1. Send receipt to Customer
      await client.sendEmail(MAILBOX_ID, {
        to: [form.email],
        subject: `Your KAAJ Order Receipt - ${finalOrderId}`,
        html: emailHtml,
      });

      // 2. Send notification to Store Owner
      const adminEmailHtml = `
        <div style="font-family: sans-serif; color: #1a1a1a; padding: 20px;">
          <h2>New Order Received: ${finalOrderId}</h2>
          <p><strong>Customer:</strong> ${form.firstName} ${form.lastName} (${form.email})</p>
          <p><strong>Total:</strong> Rs. ${total.toLocaleString()}</p>
          <p>The order has been successfully logged into WooCommerce.</p>
        </div>
      `;
      
      await client.sendEmail(MAILBOX_ID, {
        to: ["support@kaajofficial.com"],
        subject: `New Order! ${finalOrderId} - Rs. ${total.toLocaleString()}`,
        html: adminEmailHtml,
      });
    }

    return NextResponse.json({ success: true, orderNumber: finalOrderId });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing checkout.' },
      { status: 500 }
    );
  }
}
