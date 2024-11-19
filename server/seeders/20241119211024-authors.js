"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const authors = [
      { first: "Alua", last: "Arthur" },
      { first: "Hwang", last: "Bo-Reum" },
      { first: "Louise", last: "Penny" },
      { first: "Dolly", last: "Alderton" },
      { first: "Gabriel", last: "García Márquez" },
      { first: "Johann", last: "Hari" },
      { first: "Liz", last: "Nugent" },
      { first: "Asako", last: "Yuzuki" },
      { first: "John", last: "Carreyrou" },
      { first: "Toni", last: "Morrison" },
      {first: "Shanna", last: "Tan"},
      {first: "Gregory", last: "Rabassa"},
      {first: "Polly", last: "Barton"}
    ];

    await queryInterface.bulkInsert(
      "authors",
      authors.map((a) => ({
        ...a,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("authors", null, {});
  },
};
