'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Author, Tag, BookTag, BookAuthor }) {
      // define association here
      Book.belongsToMany(Author, { through: BookAuthor, targetKey: 'author', sourceKey: 'book'})
      Book.belongsToMany(Tag, { through: BookTag, targetKey: 'tag', sourceKey: 'book'})
    }
  }
  Book.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book'
    tableName: 'books',
  });
  return Book;
};