"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Author, Tag, BookTag, BookAuthor }) {
      // define association here
      Book.belongsToMany(Author, {
        through: BookAuthor,
        foreignKey: "book",
        otherKey: "author",
        as: "authors",
      });
      Book.belongsToMany(Tag, {
        through: BookTag,
        foreignKey: "book",
        otherKey: "tag",
        as: "tags",
      });
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
    },
  );
  return Book;
};
