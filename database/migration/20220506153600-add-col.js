module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS "phone" VARCHAR(255);

  `);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "user"
      DROP COLUMN IF EXISTS "phone";
    `);
  },
};
