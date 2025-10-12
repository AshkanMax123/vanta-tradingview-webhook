// index.js
import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple test route
app.get("/", (req, res) => {
  res.send("✅ Vanta Webhook is live and waiting for TradingView data.");
});

// Main webhook endpoint
app.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log("📩 Webhook received:", data);

    // Timestamp + logging
    const logDir = path.resolve("./logs");
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
    const logPath = path.join(logDir, "alerts.log");

    const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(data)}\n`;
    fs.appendFileSync(logPath, logEntry);

    res.status(200).json({ status: "ok", received: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Fallback
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Vanta Webhook running on port ${PORT}`);
});
