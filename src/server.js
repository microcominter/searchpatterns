const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 5174; // You can change the port if needed

app.use(express.json());

app.get('/search', async (req, res) => {
  const { query } = req.query;
  const apiUrl = `https://www.google.com/complete/search?filter=0&q=${encodeURIComponent(query)}&cp=13&hl=en-IN&client=gws-wiz&authuser=0`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Google:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
