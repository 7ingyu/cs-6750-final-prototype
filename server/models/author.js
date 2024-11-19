'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Book, BookAuthor }) {
      // define association here
      Author.belongsToMany(Book, through: BookAuthor)
    }
  }
  author.init({
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    middle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
    tableName: 'authors'
  });
  return author;
};