'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const axios = require('axios');

    // requests a list of all active stream-type water gauges in Tennessee
    await axios.get('https://waterservices.usgs.gov/nwis/iv/?format=json,1.1&stateCd=TN&siteType=ST&siteStatus=active')
    .then(async response => {
      // filters the list of stations to only those of water-flow type (in other words, excludes water-depth type)
      const flowOnly = response.data.value.timeSeries.filter(station => {
        return station.variable.variableCode[0].value === '00060';
      });

      const stations = flowOnly.map(station => {
        return {
          siteName: station.sourceInfo.siteName,
          siteCode: station.sourceInfo.siteCode[0].value,
          latitude: station.sourceInfo.geoLocation.geogLocation.latitude.toFixed(2),
          longitude: station.sourceInfo.geoLocation.geogLocation.longitude.toFixed(2),
          timeZone: parseInt(station.sourceInfo.timeZoneInfo.defaultTimeZone.zoneOffset.slice(0,3)),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()

        };
      });

      await queryInterface.bulkInsert('watersheds', stations, {});
    })
    .catch(err => console.log('Error', err));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('watersheds', null, {});
  }
};
