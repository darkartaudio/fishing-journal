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
      models.watershed.hasMany(models.journal);
    }
  }
  watershed.init({
    name: DataTypes.STRING,
    flowApi: DataTypes.STRING,
    weatherApi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'watershed',
  });
  return watershed;
};