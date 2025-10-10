const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Root route for testing
app.get("/", (req, res) => {
  res.send("✅ Webhook server is running.");
});

// TradingView webhook listener
app.post("/webhook", (req, res) => {
  const alert = req.body;

  // Basic logging
  console.log("🚨 ALERT RECEIVED FROM TRADINGVIEW:");
  console.log(JSON.stringify(alert, null, 2));

  // Custom console message for easy terminal viewing
  if (alert.ticker && alert.price) {
    console.log(`📈 ${alert.ticker} crossed $${alert.price} — Vanta is watching.`);
  } else {
    console.log("⚠️ Generic alert received, format may not include ticker/price.");
  }

  // Always return success to TradingView
  res.status(200).send("✅ Alert received by Vanta.");
});

app.listen(port, () => {
  console.log(`🚀 Vanta's webhook server is running on port ${port}`);
});
