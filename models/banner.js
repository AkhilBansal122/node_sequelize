'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner.hasMany(models.BannerImage, {
        foreignKey: 'banner_id', // Name of the foreign key in BannerImage table
        as: 'images', // Alias for the association
      });
    }
  }
  Banner.init({
    vendor_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    alt: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};