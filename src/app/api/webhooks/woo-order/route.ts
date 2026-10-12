import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const rawBody = await request.arrayBuffer();
    const payloadBuffer = Buffer.from(rawBody);
    const payloadText = payloadBuffer.toString('utf8');
    
    const headers = request.headers;
    const signature = headers.get('x-wc-webhook-signature');
    const topic = headers.get('x-wc-webhook-topic'); // e.g., order.updated

    const webhookSecret = process.env.WC_WEBHOOK_SECRET;

    // 1. Verify Webhook Signature (if secret is configured)
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(payloadBuffer) // MUST use raw buffer for accurate HMAC
        .digest('base64');

      if (signature !== expectedSignature) {
        console.error('Webhook signature mismatch', { expectedSignature, signature });
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } else if (!webhookSecret) {
      console.warn('WC_WEBHOOK_SECRET is not defined. Skipping signature verification.');
    }

    // 2. Parse Order Data
    let order: any = {};
    try {
      order = JSON.parse(payloadText || '{}');
    } catch (e) {
      console.log('Webhook ping received or invalid JSON payload');
      return NextResponse.json({ message: 'Ping received or invalid JSON' }, { status: 200 });
    }
    
    const status = order.status;
    console.log(`[Webhook] Received update for order ID: ${order.id}, Status: ${status}`);

    // We only care about specific statuses
    const allowedStatuses = ['processing', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      console.log(`[Webhook] Ignored status: ${status}. Only processing, completed, cancelled are supported.`);
      return NextResponse.json({ message: `Ignored status: ${status}` }, { status: 200 });
    }

    // 3. Hostinger Mail API Config
    const HOSTINGER_API_KEY = process.env.HOSTINGER_API_KEY || "f982c94a7c9a6135a03909e7d118ddb853433531b21f4f1357609d72ada5dba4";
    const MAILBOX_ID = process.env.HOSTINGER_MAILBOX_ID || "AC5ecff592b2c510d1d1e30c90b10f";

    if (!HOSTINGER_API_KEY || !MAILBOX_ID) {
      console.error('[Webhook] Hostinger Mail API credentials missing.');
      return NextResponse.json({ error: 'Mail config missing' }, { status: 200 });
    }

    const { Configuration, SendApi } = require('hostinger-mail-api-sdk');
    const config = new Configuration({ accessToken: HOSTINGER_API_KEY });
    const client = new SendApi(config);

    // 4. Extract Order Details
    const customerName = order.billing?.first_name || 'Customer';
    const customerEmail = order.billing?.email;
    const orderNumber = order.id ? `#${order.id}` : 'Unknown';
    const total = order.total || '0';
    const shipping = order.shipping_total || '0';
    const paymentMethod = order.payment_method_title || 'Unknown';

    if (!customerEmail) {
      console.warn(`[Webhook] No customer email found for order ${orderNumber}. Skipping email.`);
      return NextResponse.json({ message: 'No customer email found, skipped' }, { status: 200 });
    }

    // 5. Extract "parcel Tracking" Custom Field
    const trackingMeta = (order.meta_data || []).find((meta: any) => {
      if (!meta || !meta.key) return false;
      const normalizedKey = meta.key.toString().trim().toLowerCase().replace(/[\s_-]+/g, '');
      return (
        normalizedKey === 'parceltracking' ||
        normalizedKey === 'tracking' ||
        normalizedKey === 'trackingshare' ||
        normalizedKey === 'trackingnumber' ||
        normalizedKey === 'trackingid'
      );
    });

    const rawTrackingValue = trackingMeta?.value || order.parcel_tracking || '';
    const trackingText = typeof rawTrackingValue === 'string' ? rawTrackingValue.trim() : (rawTrackingValue ? String(rawTrackingValue).trim() : '');

    console.log(`[Webhook] Preparing to send ${status} email to ${customerEmail}. Tracking info:`, trackingText ? 'Present' : 'None');

    // Generate Tracking Box HTML if tracking info is present
    let trackingCardHtml = '';
    if (trackingText) {
      const urlMatch = trackingText.match(/https?:\/\/[^\s<]+/i);
      const trackUrl = urlMatch ? urlMatch[0] : null;

      // Make URLs clickable and preserve line breaks
      const formattedTrackingText = trackingText
        .replace(/(https?:\/\/[^\s<]+)/gi, '<a href="$1" target="_blank" style="color: #C9A84C; font-weight: bold; text-decoration: underline; word-break: break-all;">$1</a>')
        .replace(/\r?\n/g, '<br/>');

      trackingCardHtml = `
        <div style="background-color: rgba(201, 168, 76, 0.08); border: 1px solid #C9A84C; border-radius: 6px; padding: 20px; margin: 25px 0;">
          <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; font-weight: bold; margin-bottom: 10px;">
            Parcel Tracking & Courier Update
          </div>
          <div style="font-size: 13px; line-height: 1.7; color: #F0EDE6;">
            ${formattedTrackingText}
          </div>
          ${trackUrl ? `
            <div style="margin-top: 16px;">
              <a href="${trackUrl}" target="_blank" style="display: inline-block; background-color: #C9A84C; color: #1A1A18; padding: 10px 22px; text-decoration: none; font-weight: bold; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 3px;">
                Track Your Parcel
              </a>
            </div>
          ` : ''}
        </div>
      `;
    }

    // 6. Generate Items HTML
    const itemsHtml = (order.line_items || []).map((item: any) => {
      const attributesStr = (item.meta_data || [])
        .filter((meta: any) => meta.key && !meta.key.startsWith('_')) // hide internal woo meta
        .map((meta: any) => `${meta.key}: ${meta.value}`)
        .join(', ');

      return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid rgba(220, 216, 208, 0.3);">
          <strong>${item.name}</strong> x ${item.quantity}
          ${attributesStr ? `<br/><span style="font-size: 11px; color: #A9A499;">${attributesStr}</span>` : ''}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid rgba(220, 216, 208, 0.3); text-align: right;">
          Rs. ${parseInt(item.total || 0).toLocaleString()}
        </td>
      </tr>
    `}).join('');

    // 7. Define Custom Messages per Status
    let subject = '';
    let headline = '';
    let messageHtml = '';

    if (status === 'processing') {
      subject = `Order Confirmed & Processing - ${orderNumber}`;
      headline = 'Payment Received & Processing';
      messageHtml = `
        <p style="color: #DCD8D0; line-height: 1.6; margin-bottom: 25px;">
          Great news! Your order <strong style="color: #DCD8D0;">${orderNumber}</strong> has been confirmed and is now being processed by our team. We are preparing it for shipment.
        </p>
      `;
    } else if (status === 'completed') {
      subject = `Order Shipped! - ${orderNumber}`;
      headline = 'Your Order is on the Way';
      messageHtml = `
        <p style="color: #DCD8D0; line-height: 1.6; margin-bottom: 25px;">
          Your order <strong style="color: #DCD8D0;">${orderNumber}</strong> has been successfully fulfilled and handed over to our courier partner. It will be arriving soon!
        </p>
      `;
    } else if (status === 'cancelled') {
      subject = `Order Cancelled - ${orderNumber}`;
      headline = 'Order Cancelled';
      messageHtml = `
        <p style="color: #DCD8D0; line-height: 1.6; margin-bottom: 25px;">
          Your order <strong style="color: #DCD8D0;">${orderNumber}</strong> has been cancelled. If you believe this was a mistake or you have any questions, please contact our support team.
        </p>
      `;
    }

    // 8. Build the Email HTML
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #DCD8D0; background: linear-gradient(to right, #44463F 0%, #363832 100%); max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; letter-spacing: 2px; text-transform: uppercase; color: #DCD8D0; margin: 0;">K A A J</h1>
          <p style="font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: #A9A499; margin-top: 5px;">Order Update</p>
        </div>
        
        <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px; color: #DCD8D0;">Hello ${customerName},</h2>
        <h3 style="font-size: 16px; color: #C9A84C; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">${headline}</h3>
        
        ${messageHtml}

        ${trackingCardHtml}
        
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(220, 216, 208, 0.3); padding-bottom: 10px; margin-bottom: 20px; color: #DCD8D0;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; color: #DCD8D0;">
          ${itemsHtml}
          <tr>
            <td style="padding: 10px; text-align: right; color: #A9A499;">Subtotal</td>
            <td style="padding: 10px; text-align: right; color: #A9A499;">Rs. ${(parseInt(total) - parseInt(shipping)).toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; text-align: right; color: #A9A499;">Shipping</td>
            <td style="padding: 10px; text-align: right; color: #A9A499;">${parseInt(shipping) === 0 ? 'Free' : `Rs. ${parseInt(shipping).toLocaleString()}`}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; text-align: right; font-size: 18px; color: #DCD8D0;">Total</td>
            <td style="padding: 10px; font-weight: bold; text-align: right; font-size: 18px; color: #DCD8D0;">Rs. ${parseInt(total).toLocaleString()}</td>
          </tr>
        </table>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(220, 216, 208, 0.3); padding-bottom: 10px; margin-bottom: 20px; color: #DCD8D0;">Delivery Address</h3>
        <p style="color: #DCD8D0; line-height: 1.6;">
          <strong style="color: #DCD8D0;">${order.shipping?.first_name || order.billing?.first_name} ${order.shipping?.last_name || order.billing?.last_name}</strong><br>
          ${order.shipping?.address_1 || order.billing?.address_1}<br>
          ${order.shipping?.city || order.billing?.city}, ${order.shipping?.state || order.billing?.state} ${order.shipping?.postcode || order.billing?.postcode || ''}<br>
          Method: ${paymentMethod}
        </p>

        <div style="margin-top: 50px; text-align: center; border-top: 1px solid rgba(220, 216, 208, 0.3); padding-top: 30px;">
          <p style="font-size: 12px; color: #A9A499;">If you have any questions, please reply to this email.</p>
          <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; margin-top: 20px;">K A A J</p>
        </div>
      </div>
    `;

    // 9. Dispatch Email
    try {
      await client.sendEmail(MAILBOX_ID, {
        to: [customerEmail],
        subject: subject,
        html: emailHtml,
      });

      console.log(`[Webhook] SUCCESS: Email dispatched to ${customerEmail} via Hostinger.`);
      return NextResponse.json({ success: true, message: `Status email sent for ${orderNumber} (${status})` });
    } catch (sendError) {
      console.error(`[Webhook] Hostinger email dispatch error for ${orderNumber}:`, sendError);
      // Return 200 to acknowledge webhook receipt so WooCommerce does not auto-disable it
      return NextResponse.json({
        success: false,
        message: 'Order received but email dispatch encountered an issue',
        error: sendError instanceof Error ? sendError.message : String(sendError)
      }, { status: 200 });
    }
  } catch (error) {
    console.error('[Webhook] CRITICAL ERROR:', error);
    // Return 200 so WooCommerce webhook is not marked as failed and disabled
    return NextResponse.json(
      { error: 'An error occurred while processing webhook.', details: error instanceof Error ? error.message : String(error) },
      { status: 200 }
    );
  }
}
