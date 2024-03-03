'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     //   const User_Profile = sequelize.define('customer_profiles', {}, { timestamps: false });

        const Grant = sequelize.define('customer_profiles', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
              },
            selfGranted: DataTypes.BOOLEAN
          }, { timestamps: false });

        Customer.belongsToMany(models.Profile, { through: Grant,uniqueKey: 'my_custom_unique' });
        models.Profile.belongsToMany(Customer, { through: Grant });
    }
  }
  Customer.init({

    username: DataTypes.STRING,
    points: DataTypes.INTEGER
  },
 {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};