import nodemailer, { SendMailOptions } from "nodemailer";
import { NextResponse } from "next/server";

// Email template function
const createEmailTemplate = (data: {
  firstName: string;
  email: string;
  phone: string;
  service: string[];
  message: string;
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
      <h2 style="color: #2563eb;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${data.firstName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">
            <a href="mailto:${data.email}">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">
            ${data.phone || 'Not provided'}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Services:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">
            ${data.service?.join(", ") || 'Not specified'}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 8px; white-space: pre-line;">${data.message}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        This email was sent from the contact form on AllTech Cloud Services website.
      </p>
    </div>
  `;
};

export async function POST(req: Request) {
  // Validate required environment variables
  const requiredEnvVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_SECURE',
    'CPANEL_EMAIL_USER',
    'CPANEL_EMAIL_PASS',
    'EMAIL_FROM'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    return NextResponse.json(
      { 
        success: false,
        message: 'Server configuration error',
        error: `Missing environment variables: ${missingVars.join(', ')}`
      },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    // Explicitly type the request body
    const { firstName, email, phone, service = [], message }: {
      firstName: string;
      email: string;
      phone?: string;
      service?: string[];
      message: string;
    } = body;

    // Validate required fields
    if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Validation failed',
          error: 'First name, email, and message are required fields'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Validation failed',
          error: 'Invalid email format'
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.CPANEL_EMAIL_USER,
        pass: process.env.CPANEL_EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production"
      },
      logger: process.env.NODE_ENV === "development",
      debug: process.env.NODE_ENV === "development"
    });

    // Verify connection configuration
    await transporter.verify();

    // Explicitly type mailOptions with SendMailOptions
    const mailOptions: SendMailOptions = {
      from: `"AllTech Cloud Services" <${process.env.EMAIL_FROM}>`,
      to: "ipv4@alltechcloudservices.com",
      cc: process.env.EMAIL_CC?.split(',').filter(Boolean) || [],
      replyTo: email,
      subject: `New Contact Request: ${firstName.trim()}`,
      text: `
        Name: ${firstName.trim()}
        Email: ${email.trim()}
        Phone: ${phone?.trim() || 'Not provided'}
        Services: ${service?.join(", ") || 'Not specified'}
        Message: ${message.trim()}
      `,
      html: createEmailTemplate({
        firstName: firstName.trim(),
        email: email.trim(),
        phone: phone?.trim() || '',
        service: Array.isArray(service) ? service : [],
        message: message.trim()
      }),
      priority: 'high' // TypeScript now recognizes this as valid
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId 
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error("Email error:", error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorResponse = {
      success: false,
      message: 'Failed to send email',
      error: errorMessage,
      ...(process.env.NODE_ENV === "development" && error instanceof Error 
        ? { stack: error.stack } 
        : {})
    };

    return NextResponse.json(
      errorResponse,
      { status: 500 }
    );
  }
}