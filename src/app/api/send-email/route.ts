import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, message, service } = await request.json();

  if (!name || !email || !message || !service) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const mailOptions = {
    from: email,
    to: 'ipv4@alltechcloudservices.com',
    subject: `New Form Submission from ${name} (${service})`,
    text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error sending email', error: errorMessage }, { status: 500 });
  }
}