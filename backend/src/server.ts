import express from 'express';

const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.send('Got your request');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
