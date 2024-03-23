'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100)
      },
      short_name:{
        type:Sequelize.STRING(50)
      },
      country_code: {
        type: Sequelize.STRING(10)
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1 // 1 for active, 2 for inactive
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Adding index to the name column
    await queryInterface.addIndex('countries', ['name']);
    await queryInterface.addIndex('countries', ['short_name']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('countries');
  }
};
