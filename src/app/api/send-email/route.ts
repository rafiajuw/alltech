import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { firstName, email, phone, service, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // mail.alltechcloudservices.com
      port: Number(process.env.SMTP_PORT), // 465
      secure: process.env.SMTP_SECURE === "true", // true for SSL (port 465)
      auth: {
        user: process.env.CPANEL_EMAIL_USER, // sales@alltechcloudservices.com
        pass: process.env.CPANEL_EMAIL_PASS, // your email password
      },
    });

    const mailOptions = {
      from: `"AllTech Cloud Services" <${process.env.EMAIL_FROM}>`, // "AllTech Cloud Services" <sales@alltechcloudservices.com>
      to: "ipv4@alltechcloudservices.com", // Recipient
      replyTo: email, // User’s email for replies
      subject: `New Contact Form Submission from ${firstName}`,
      text: `
        Name: ${firstName}
        Email: ${email}
        Phone: ${phone}
        Services: ${service.join(", ") || "None"}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Services:</strong> ${service.join(", ") || "None"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Email error:", error);
    const errorMessage = error instanceof Error ? error.message : "Error sending email";
    return new Response(
      JSON.stringify({ message: "Error sending email", error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}