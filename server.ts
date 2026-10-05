import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "rgmonish@gmail.com",
    pass: process.env.SMTP_PASSWORD || "lscx dujd wjmc ukro",
  },
});

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3001;

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Basic API health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Handle Form to Email submission via Authenticated SMTP
  app.post(["/api/send-inquiry", "/api/inquiry", "/send-inquiry.php"], async (req, res) => {
    const { name, email, phone, subject, message, type, position, experience } = req.body;
    const recipient = process.env.TARGET_EMAIL || "manish@excitesys.com";

    console.log("==========================================");
    console.log(`[INQUIRY RECEIVED] Forwarding to: ${recipient}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Subject: ${subject}`);
    console.log(`Type: ${type}`);
    console.log(`Message: ${message}`);
    console.log("==========================================");

    const inquiryId = "PUNIT-" + Date.now().toString(36).toUpperCase();
    const formattedSubject = `[${inquiryId}] ${subject || "New Website Inquiry"} - ${name || email}`;

    const bodyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset='utf-8'>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f7f4; margin: 0; padding: 24px; color: #27272a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0f2e1e; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #f4d068; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #d4d4d8; }
          .content { padding: 24px; }
          .badge { display: inline-block; padding: 4px 10px; background: #e8f0eb; color: #0f2e1e; font-size: 11px; font-weight: 700; border-radius: 20px; text-transform: uppercase; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #f4f4f5; font-size: 14px; }
          th { width: 35%; color: #71717a; font-weight: 600; background-color: #fafafa; }
          td { color: #18181b; }
          .message-box { background: #f8fafc; border-left: 4px solid #0f2e1e; padding: 16px; border-radius: 4px; margin-top: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
          .footer { background: #fafafa; padding: 16px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #f4f4f5; }
        </style>
      </head>
      <body>
        <div class='container'>
          <div class='header'>
            <h1>PUNITDHAN PULSES LIMITED</h1>
            <p>Official Website Inquiry Notification</p>
          </div>
          <div class='content'>
            <div class='badge'>Form Type: ${type || "Website Inquiry"}</div>
            <table>
              <tr><th>Inquiry Ref ID</th><td><strong>${inquiryId}</strong></td></tr>
              <tr><th>Full Name</th><td><strong>${name || "Anonymous"}</strong></td></tr>
              <tr><th>Email Address</th><td><a href='mailto:${email}'>${email || "Not Provided"}</a></td></tr>
              <tr><th>Phone Number</th><td><a href='tel:${phone}'>${phone || "Not Provided"}</a></td></tr>
              <tr><th>Subject / Product</th><td>${subject || "General Inquiry"}</td></tr>
              ${position ? `<tr><th>Applied Position</th><td>${position}</td></tr>` : ""}
              ${experience ? `<tr><th>Experience</th><td>${experience}</td></tr>` : ""}
              <tr><th>Submission Time</th><td>${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td></tr>
            </table>

            <h3 style='margin-top: 24px; margin-bottom: 8px; font-size: 14px; color: #0f2e1e; text-transform: uppercase;'>Inquiry Details / Message:</h3>
            <div class='message-box'>${(message || "No additional message text.").replace(/\n/g, "<br/>")}</div>
          </div>
          <div class='footer'>
            Sent from official Punitdhan Pulses web portal.<br>
            Recipient: <strong>${recipient}</strong>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: '"Punitdhan Pulses Web Portal" <rgmonish@gmail.com>',
        to: recipient,
        replyTo: email && email.includes("@") ? email : undefined,
        subject: formattedSubject,
        html: bodyHtml,
        text: `Inquiry ID: ${inquiryId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`,
      });
      console.log(`[SMTP SUCCESS] Email delivered! Message ID: ${info.messageId}`);
      res.json({
        success: true,
        message: `Inquiry successfully delivered to ${recipient}`,
        inquiryId,
      });
    } catch (err: any) {
      console.error("[SMTP ERROR] Failed to send email:", err);
      res.status(500).json({
        success: false,
        message: "Failed to dispatch email: " + (err.message || "Internal error"),
      });
    }
  });

  // Bulletproof detection of production mode
  const isProd =
    process.env.NODE_ENV === "production" ||
    (fs.existsSync(path.join(process.cwd(), "dist/index.html")) &&
      !fs.existsSync(path.join(process.cwd(), "server.ts")));

  // Serve static files in production, use Vite middleware in development
  if (!isProd) {
    console.log("[Server] Launching in DEVELOPMENT mode (Vite Middleware)");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Server] Launching in PRODUCTION mode (Static Assets)");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
