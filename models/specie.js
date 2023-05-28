'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.specie.hasMany(models.entrie);
    }
  }
  specie.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'specie',
  });
  return specie;
};