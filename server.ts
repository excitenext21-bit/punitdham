import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic API health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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
