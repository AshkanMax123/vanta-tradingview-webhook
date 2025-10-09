const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(`🔥 ALERT: ${JSON.stringify(req.body)}`);
  res.send('🚨 Webhook received');
});

app.get('/', (req, res) => {
  res.send('✅ Server is live and tracking OPEN alerts.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
