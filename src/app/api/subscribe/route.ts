import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const HOSTINGER_API_KEY = process.env.HOSTINGER_API_KEY || "f982c94a7c9a6135a03909e7d118ddb853433531b21f4f1357609d72ada5dba4";
    const MAILBOX_ID = process.env.HOSTINGER_MAILBOX_ID || "AC5ecff592b2c510d1d1e30c90b10f";

    if (HOSTINGER_API_KEY && MAILBOX_ID) {
      const { Configuration, SendApi } = require('hostinger-mail-api-sdk');
      const config = new Configuration({ accessToken: HOSTINGER_API_KEY });
      const client = new SendApi(config);

      // Welcome Email HTML
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <h1 style="font-size: 24px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; margin-bottom: 20px;">KAAJ</h1>
          <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px;">Welcome to the Atelier</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            Thank you for subscribing. You are now on the exclusive list to hear about our newest collections, private sales, and behind-the-scenes artistry before anyone else.
          </p>
          <a href="https://kaajofficial.com/shop" style="display: inline-block; padding: 12px 24px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;">Explore The Shop</a>
        </div>
      `;

      await client.sendEmail(MAILBOX_ID, {
        to: [email],
        subject: "Welcome to KAAJ",
        html: emailHtml,
      });

      // Notify Admin
      await client.sendEmail(MAILBOX_ID, {
        to: ["support@kaajofficial.com"],
        subject: "New Newsletter Subscriber!",
        html: `<p>A new user just subscribed to the newsletter: <strong>${email}</strong></p>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter Subscribe Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
