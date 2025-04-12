import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
  name: string;
  email: string;
  ipBlock: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const { name, email, ipBlock, message }: EmailRequestBody = await request.json();

    if (!name || !email || !ipBlock || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration missing');
    }

    // Create transporter with type safety
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options with proper typing
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${name}" <${email}>`,
      to: 'your-email@example.com',
      subject: 'New IP Selling Request',
      text: `
        New IP Selling Request:
        Name: ${name}
        Email: ${email}
        IP Block: ${ipBlock}
        Message: ${message}
      `,
      html: `
        <h2>New IP Selling Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>IP Block:</strong> ${ipBlock}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}