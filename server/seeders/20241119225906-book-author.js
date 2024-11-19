'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const jennifer = [
      "Briefly Perfectly Human: Making an Authentic Life by Getting Real About the End",
      "Welcome to the Hyunam-Dong Bookshop",
      "Glass Houses (Chief Inspector Armand Gamache, #13)",
      "Good Material",
      "One Hundred Years of Solitude",
      "Stolen Focus: Why You Can't Pay Attention— and How to Think Deeply Again",
      "Strange Sally Diamond",
      "Butter",
      "Bad Blood: Secrets and Lies in a Silicon Valley Startup",
      "Beloved (Beloved Trilogy, #1)",
    ];
    const multi = [
      "Welcome to the Hyunam-Dong Bookshop",
      "One Hundred Years of Solitude",
      "Butter",
    ];

    await queryInterface.bulkInsert("book_author", [
      ...jennifer.map((name, i) => ({
        author: i + 1,
        book: i + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      ...multi.map((name, i) => ({
        author: jennifer.length + 1,
        book: jennifer.indexOf(name) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
