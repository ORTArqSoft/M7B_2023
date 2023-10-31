const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  if (Math.random() < 0.5) {
    throw new Error('Service Error');
  } else {
    res.send('Processing Service is running');
  }
});

app.listen(port, () => {
  console.log(`Processing Service listening on port ${port}`);
});
