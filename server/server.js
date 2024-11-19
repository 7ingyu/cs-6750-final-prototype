require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected.');
  } catch (e) {
    console.log('Unable to connect to db:', e);
  }
  console.log(`Server is running on http://localhost:${port}`);
});