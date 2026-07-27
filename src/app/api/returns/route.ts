import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData: any = await request.formData();
    const orderId = formData.get('orderId') as string;
    const email = formData.get('email') as string;
    const reason = formData.get('reason') as string;
    const details = formData.get('details') as string;
    const image = formData.get('image') as File | null;

    if (!orderId || !email || !reason) {
      return NextResponse.json(
        { error: 'Order ID, Email, and Reason are required.' },
        { status: 400 }
      );
    }

    // Use Hostinger Mail API
    const HOSTINGER_API_KEY = process.env.HOSTINGER_API_KEY || "f982c94a7c9a6135a03909e7d118ddb853433531b21f4f1357609d72ada5dba4";
    const MAILBOX_ID = process.env.HOSTINGER_MAILBOX_ID || "AC5ecff592b2c510d1d1e30c90b10f";

    if (HOSTINGER_API_KEY && MAILBOX_ID) {
      const { Configuration, SendApi } = require('hostinger-mail-api-sdk');
      const config = new Configuration({ accessToken: HOSTINGER_API_KEY });
      const client = new SendApi(config);

      const attachments = [];
      
      if (image && image.size > 0) {
        const base64Content = Buffer.from(await image.arrayBuffer()).toString('base64');
        attachments.push({
          filename: image.name,
          content: base64Content
        });
      }

      await client.sendEmail(MAILBOX_ID, {
        to: ["support@kaajofficial.com"],
        subject: `Return Request - Order #${orderId}`,
        text: `
A new return request has been submitted.

Order ID: ${orderId}
Customer Email: ${email}
Reason: ${reason}
Additional Details: ${details || 'None provided'}
        `,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
    } else {
      console.log(`[Mock Return Submitted] Order: ${orderId}, Email: ${email}, Reason: ${reason}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing return request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
