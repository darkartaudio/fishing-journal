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
      { name: 'woolly bugger' },
      { name: 'yard sale' },
      { name: 'leggy boi' },
      { name: 'stealth bomber' },
      { name: 'dahlberg diver' },
      { name: 'fleeing cray' },
      { name: 'tequeely' },
      { name: 'pheasant tail nymph' },
      { name: 'frenchie' },
      { name: 'thread frenchie' },
      { name: 'perdigon' },
      { name: 'chubby chernobyl' },
      { name: 'hippie stomper' },
      { name: 'missing link' },
      { name: 'parachute adams' },
      { name: 'zebra midge' },
      { name: `hare's ear nymph` },
      { name: 'ec caddis' },
      { name: 'green weenie' },
      { name: 'thunderhead' },
      { name: 'morrish hopper' },
      { name: 'crack fang' },
      { name: 'ditch walker' },
      { name: 'white belly mouse' },
      { name: `swingin' d` },
      { name: 'drunk and disorderly' },
      { name: 'sex dungeon' },
      { name: 'circus peanut' },
      { name: `todd's wiggle minnow` },
      { name: 'wiggle bug' },
      { name: 'waker shad' },
      { name: 'double deceiver' },
      { name: 'clouser minnow' },
      { name: 'trouser worm' },
      { name: 'polywog' },
      { name: 'partridge and peacock' },
      { name: 'copper john' },
      { name: 'san juan worm' },
      { name: 'squirmy worm' },
      { name: `glo bug` },
      { name: `pat's rubber legs` },
      { name: `near nuff crayfish` },
      { name: `near nuff sculpin` },
      { name: `deceiver` },
      { name: `clouser minnow` },
      { name: `finesse game changer` },
      { name: `mini finesse game changer` },
      { name: `micro finesse game changer` },
      { name: `feather game changer` },
      { name: `jerk game changer` },
      { name: `t-bone` },
      { name: `headbanger sculpin` },
      { name: 'cooter brown' }
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
