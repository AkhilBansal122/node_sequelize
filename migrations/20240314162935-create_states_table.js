'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('states', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Countries',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(255)
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
    await queryInterface.addIndex('states', ['country_id']);
    await queryInterface.addIndex('states', ['name']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('states');
  }
};
