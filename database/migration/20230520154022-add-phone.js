'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS "phone" VARCHAR(255);
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "user"
      DROP COLUMN IF EXISTS "phone";
    `);
  },
};
