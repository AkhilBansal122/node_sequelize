'use strict';
const {
  Model
} = require('sequelize');
const { imagePath } = require('../helper');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Category model
      // Brand.belongsTo(models.Category, {
      //   foreignKey: 'category_id',
      //   as: 'category'
      // });
      
      // Define association with Vendor model
      Brand.belongsTo(models.Vendor, {
        foreignKey: 'vendor_id',
        as: 'vendor'
      });
    }
  }
  Brand.init({
    category_id: DataTypes.INTEGER,
    vendor_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    meta_title: DataTypes.STRING,
    meta_description: DataTypes.STRING,
    meta_keywords: DataTypes.STRING,
    status: DataTypes.INTEGER,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return ` ${  this.name.length>0  ? this.name.toUpperCase() :''}`;
      },
    },
    fullSlug: {
      type: DataTypes.VIRTUAL,
      get() {
        return ` ${  this.slug  !==null ? this.slug.toUpperCase( ) :'' }`;
      },
    },
    brandImage :{
      type:DataTypes.VIRTUAL,
      get(){
        return `${  this.image  !==null ? imagePath(this.image) :'' }`
      }
    }

    
  }, {
    sequelize,
    modelName: 'Brand',
    tableName:"brands"
  });
  
  return Brand;
};