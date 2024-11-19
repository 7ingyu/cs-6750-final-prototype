require('dotenv').config();
const express = require('express');
const { sequelize, Book, Tag, Author } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.get('/books', async (req, res) => {
  const books = await Book.findAll({
    attributes: ['name', 'description'],
    include: [
      {
        model: Author,
        attributes: ['first', 'last', 'middle'],
      },
      {
        model: Tag,
        attributes: ['name'],
      },
    ],
  });
  res.send('Hello World!');
});

app.get('/tags', async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('DB connected.');
  } catch (e) {
    console.log('Unable to connect to db:', e);
  }
  console.log(`Server is running on http://localhost:${port}`);
});