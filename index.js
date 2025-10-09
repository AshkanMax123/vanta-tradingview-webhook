const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  res.status(200).send('Webhook received');
});

app.get('/', (req, res) => {
  res.send('Vanta TradingView Webhook is live!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
