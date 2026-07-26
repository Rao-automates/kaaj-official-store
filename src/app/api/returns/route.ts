import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
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

    // Attempt to send email if SMTP credentials are provided in env
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    console.log("SMTP Variables Present?:", {
      host: !!SMTP_HOST,
      port: !!SMTP_PORT,
      user: !!SMTP_USER,
      pass: !!SMTP_PASS
    });

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const attachments = [];
      
      if (image && image.size > 0) {
        const buffer = Buffer.from(await image.arrayBuffer());
        attachments.push({
          filename: image.name,
          content: buffer,
          contentType: image.type,
        });
      }

      await transporter.sendMail({
        from: `"KAAJ Official Returns" <${SMTP_USER}>`,
        to: "support@kaajofficial.com",
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
      // If no credentials, we still return success for the frontend simulation
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
