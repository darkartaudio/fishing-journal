'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entrie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.entrie.belongsTo(models.user);
      models.entrie.belongsTo(models.watershed);
      models.entrie.belongsTo(models.specie);
      models.entrie.belongsTo(models.technique);
      models.entrie.belongsTo(models.lure);
    }
  }
  entrie.init({
    userId: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    watershedId: DataTypes.INTEGER,
    specieId: DataTypes.INTEGER,
    techniqueId: DataTypes.INTEGER,
    lureId: DataTypes.INTEGER,
    length: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    waterTemp: DataTypes.FLOAT,
    comment: DataTypes.STRING,
    airTemp: DataTypes.FLOAT,
    windSpeed: DataTypes.FLOAT,
    windDirection: DataTypes.STRING,
    barometer: DataTypes.FLOAT,
    cloudCover: DataTypes.INTEGER,
    dailyHigh: DataTypes.FLOAT,
    dailyLow: DataTypes.FLOAT,
    dailyPrecip: DataTypes.FLOAT,
    waterFlow: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'entrie',
  });
  return entrie;
};