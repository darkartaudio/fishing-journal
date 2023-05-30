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
    const lures = [
      { name: 'Woolly Bugger' },
      { name: 'Yard Sale' },
      { name: 'Leggy Boi' },
      { name: 'Stealth Bomber' },
      { name: 'Dahlberg Diver' },
      { name: 'Fleeing Cray' },
      { name: 'Tequeely' },
      { name: 'Pheasant Tail Nymph' },
      { name: 'Frenchie' },
      { name: 'Thread Frenchie' },
      { name: 'Perdigon' },
      { name: 'Chubby Chernobyl' },
      { name: 'Hippie Stomper' },
      { name: 'Missing Link' },
      { name: 'Parachute Adams' },
      { name: 'Zebra Midge' },
      { name: `Hare's Ear Nymph` },
      { name: 'EC Caddis' },
      { name: 'Green Weenie' },
      { name: 'Thunderhead' },
      { name: 'Morrish Hopper' },
      { name: 'Crack Fang' },
      { name: 'Ditch Walker' },
      { name: 'White Belly Mouse' },
      { name: `Swingin' D` },
      { name: 'Drunk and Disorderly' },
      { name: 'Sex Dungeon' },
      { name: 'Circus Peanut' },
      { name: `Todd's Wiggle Minnow` },
      { name: 'Wiggle Bug' },
      { name: 'Waker Shad' },
      { name: 'Double Deceiver' },
      { name: 'Clouser Minnow' },
      { name: 'Trouser Worm' },
      { name: 'Polywog' },
      { name: 'Partridge and Peacock' },
      { name: 'Copper John' },
      { name: 'San Juan Worm' },
      { name: 'Squirmy Worm' },
      { name: `Swimmin' Jimmy` },
      { name: 'Cooter Brown' }
    ];
   
    const datedLures = lures.map(t => {
      return {
        name: t.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });

    await queryInterface.bulkInsert('lures', datedLures, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('lures', null, {});
  }
};
