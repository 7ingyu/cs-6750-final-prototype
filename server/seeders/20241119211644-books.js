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
    const kalika = [
      "The Last Wish",
      "None of This is True",
      "A Court of Frost and Starlight",
      "Daughter of the Pirate King",
      "Pretty Girls",
      "The Gilded Cage",
      "A Strange Hymn",
      "A Court of Wings and Ruin",
      "Butcher & Blackbird",
      "The Dallergut Dream Department Store",
      "Divine Rivals",
      "Lessons in Chemistry",
      "The Da Vinci Code",
      "A Court of Mist and Fury",
      "Mexican Gothic",
      "Magic Study",
      "Poison Study",
      "The Prison Healer",
      "Uprooted",
      "Starling House",
      "Iron Flame",
      "Fourth Wing",
      "A Court of Thorns and Roses",
      "Mad Honey",
      "My Plain Jane",
    ];

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

    await queryInterface.bulkInsert("books", [
      ...jennifer.map((name, i) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      ...kalika.map((name) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("books", null, {});
  },
};
