'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class technique extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.technique.hasMany(models.entrie);
    }
  }
  technique.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'technique',
  });
  return technique;
};