import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3001;

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Basic API health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Handle Form to Email submission
  app.post(["/api/send-inquiry", "/api/inquiry"], async (req, res) => {
    const { name, email, phone, subject, message, type, position, experience } = req.body;
    const recipient = "manish@excitesys.com";

    console.log("==========================================");
    console.log(`[INQUIRY RECEIVED] Forwarding to: ${recipient}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Subject: ${subject}`);
    console.log(`Type: ${type}`);
    console.log(`Message: ${message}`);
    console.log("==========================================");

    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name || "Anonymous",
          email: email || "no-reply@punitdhan.com",
          phone: phone || "Not Provided",
          subject: subject || "Website Inquiry",
          form_type: type || "General Inquiry",
          position: position || "N/A",
          experience: experience || "N/A",
          message: message || "No message provided",
          _subject: `[Punitdhan Inquiry] ${subject || "Website Inquiry"} from ${name || email}`,
          _replyto: email,
          _captcha: "false",
        }),
      });
    } catch (err) {
      console.warn("[Server] Relay notice:", err);
    }

    res.json({
      success: true,
      message: `Inquiry successfully forwarded to ${recipient}`,
    });
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
