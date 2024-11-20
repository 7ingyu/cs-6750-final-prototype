require("dotenv").config();
const express = require("express");
const { sequelize, Book, Tag, Author } = require("./models");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/api/books", async (req, res) => {
  const books = await Book.findAll({
    attributes: ["name", "description"],
    include: [
      {
        model: Author,
        attributes: ["first", "last", "middle"],
        through: { attributes: [] },
        as: "authors",
      },
      {
        model: Tag,
        attributes: ["name"],
        through: { attributes: [] },
        as: "tags",
      },
    ],
  });
  res.json(books);
});

app.get("/api/tags", async (req, res) => {
  const tags = await Tag.findAll({
    attributes: ["name"],
    include: [
      {
        model: Book,
        attributes: ["id", "name"],
        through: { attributes: [] },
        as: "books",
      },
    ],
  });
  res.json(tags);
});

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "dist") });
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected.");
  } catch (e) {
    console.log("Unable to connect to db:", e);
  }
  console.log(`Server is running on http://localhost:${port}`);
});
