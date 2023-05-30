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

    const techs = [
      { name: 'topwater' },
      { name: 'streamer' },
      { name: 'indicator' },
      { name: 'tightline' },
      { name: 'dry fly' },
      { name: 'dropshot' },
      { name: 'sight' },
      { name: 'swing' }
    ];
   
    const datedTechs = techs.map(t => {
      return {
        name: t.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });

    await queryInterface.bulkInsert('techniques', datedTechs, {});
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('techniques', null, {});
  }
};
