'use strict';
const bcrypt = require('bcryptjs');
const db =require("../../backend/models");
const AdminModal = db.Admin;
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12345678', 10); // 10 is the saltRounds
    // Using findOrCreate
    const [admin, created] = await AdminModal.findOrCreate({
      where: { email: 'admin1@yopmail.com' },
      defaults: {
        name: 'John',
        type: 1,
        email: 'admin1@yopmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    // If you want to update the record if it exists, you can use upsert instead
    // const [admin, created] = await AdminModal.upsert({
    //   name: 'John',
    //   type: 1,
    //   email: 'admin1@yopmail.com',
    //   password: hashedPassword,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }, { where: { email: 'admin1@yopmail.com' } });

    return Promise.resolve();
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
