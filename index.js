const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log('Alert received:', req.body);
  res.status(200).send('Webhook received!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
