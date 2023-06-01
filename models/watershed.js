'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class watershed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.watershed.hasMany(models.entrie);
    }
  }
  watershed.init({
    siteName: DataTypes.STRING,
    siteCode: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    timeZone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'watershed',
  });
  return watershed;
};