'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12345678', 10); // 10 is the saltRounds
    return queryInterface.bulkInsert('admins', [{
      name: 'John',
      type: 1,
      email: 'admin1@yopmail.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admins', null, {});
  }
};