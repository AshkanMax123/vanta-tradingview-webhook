// index.js
import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { logToGitHub } from "./githubLogger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const logDir = path.resolve("./logs");
const logPath = path.join(logDir, "alerts.log");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.send("✅ Vanta TradingView webhook active.");
});

// Webhook endpoint
app.post("/", async (req, res) => {
  try {
    const alertData = req.body;
    console.log("📩 Webhook received:", alertData);

    const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(alertData)}\n`;
    fs.appendFileSync(logPath, logEntry);

    await logToGitHub(alertData); // push to GitHub log

    res.status(200).json({ status: "ok", received: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Simple self-check job every 2 minutes
setInterval(() => {
  const checkEntry = `[${new Date().toISOString()}] 🕒 Heartbeat check — server alive.\n`;
  fs.appendFileSync(logPath, checkEntry);
  logToGitHub({ heartbeat: "ok", timestamp: new Date().toISOString() });
}, 120000); // 120000 ms = 2 minutes

// Fallback route
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Vanta Webhook running on port ${PORT}`);
});
