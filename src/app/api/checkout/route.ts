import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { form, cart, shipping, total, orderNumber } = data;

    if (!form || !form.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Hostinger Mail API Config
    const HOSTINGER_API_KEY = process.env.HOSTINGER_API_KEY;
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
            Your order <strong>${orderNumber}</strong> has been received and is now being processed. Our team will contact you shortly for confirmation.
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

      await client.sendEmail(MAILBOX_ID, {
        to: [form.email],
        subject: `Your KAAJ Order Receipt - ${orderNumber}`,
        html: emailHtml,
      });
    }

    return NextResponse.json({ success: true, orderNumber });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing checkout.' },
      { status: 500 }
    );
  }
}
