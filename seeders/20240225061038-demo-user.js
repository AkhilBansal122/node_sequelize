module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      first_name: 'John',
      last_name: 'Doe',
      username:"John",
      email: 'admins@yopmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      role:'user'
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};