const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("🚨 Alert received:", req.body);  // THIS LINE LOGS THE ALERT
  res.send("✅ Webhook received!");
});

app.get("/", (req, res) => {
  res.send("✅ Server is live 🚀");
});

app.listen(PORT, () => {
  console.log(`🟢 Server is running on port ${PORT}`);
});
