// OPEN TRADE TRACKING WEBHOOK

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

// Webhook POST handler
app.post("/", (req, res) => {
  const alert = req.body;
  console.log("📩 Webhook Received:", alert);

  // Check if alert is for OPEN
  if (alert.ticker === "OPEN") {
    const price = parseFloat(alert.price);

    if (price >= 8.70) {
      console.log("🔥 ALERT: OPEN hit $8.70 — consider trimming your calls.");
    } else if (price >= 8.50) {
      console.log("🔔 OPEN testing breakout at $8.50 — watch volume.");
    } else if (price <= 8.00) {
      console.log("🛑 ALERT: OPEN dropped below $8.00 — stop zone breached.");
    } else if (price <= 7.85) {
      console.log("⚠️ CRITICAL: OPEN below $7.85 — exit risk high.");
    }
  }

  res.send("✅ Webhook processed.");
});

// Basic health check
app.get("/", (req, res) => {
  res.send("✅ Server is live and tracking OPEN alerts.");
});

app
