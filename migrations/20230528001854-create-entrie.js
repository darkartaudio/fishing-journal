'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.DATE
      },
      watershedId: {
        type: Sequelize.INTEGER
      },
      specieId: {
        type: Sequelize.INTEGER
      },
      techniqueId: {
        type: Sequelize.INTEGER
      },
      lureId: {
        type: Sequelize.INTEGER
      },
      length: {
        type: Sequelize.FLOAT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      waterTemp: {
        type: Sequelize.FLOAT
      },
      comment: {
        type: Sequelize.STRING
      },
      airTemp: {
        type: Sequelize.FLOAT
      },
      windSpeed: {
        type: Sequelize.FLOAT
      },
      windDirection: {
        type: Sequelize.STRING
      },
      dailyHigh: {
        type: Sequelize.FLOAT
      },
      dailyLow: {
        type: Sequelize.FLOAT
      },
      waterFlow: {
        type: Sequelize.FLOAT
      },
      barometer: {
        type: Sequelize.FLOAT
      },
      cloudCover: {
        type: Sequelize.INTEGER
      },
      dailyPrecip: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entries');
  }
};