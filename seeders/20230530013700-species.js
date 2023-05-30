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
    const species = [
      {
        name: 'smallmouth bass',
        wiki: 'https://en.wikipedia.org/wiki/Smallmouth_bass',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Smallmouth_bass.png/220px-Smallmouth_bass.png'
      },
      {
        name: 'largemouth bass',
        wiki: 'https://en.wikipedia.org/wiki/Largemouth_bass',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/1351_largemouth_bass_%28Micropterus_salmoides%29_300_dpi.jpg/220px-1351_largemouth_bass_%28Micropterus_salmoides%29_300_dpi.jpg'
      },
      {
        name: 'spotted bass',
        wiki: 'https://en.wikipedia.org/wiki/Spotted_bass',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Micropterus_punctulatus.jpg/220px-Micropterus_punctulatus.jpg'
      },
      {
        name: 'striped bass',
        wiki: 'https://en.wikipedia.org/wiki/Striped_bass',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Morone_saxatilis_SI2.jpg/220px-Morone_saxatilis_SI2.jpg'
      },
      {
        name: 'white bass',
        wiki: 'https://en.wikipedia.org/wiki/White_bass',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/White_Bass.jpg/220px-White_Bass.jpg'
      },
      {
        name: 'yellow bass',
        wiki: 'https://en.wikipedia.org/wiki/Yellow_bass',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Yellow_Bass.gif/220px-Yellow_Bass.gif'
      },
      {
        name: 'hybrid striped bass',
        wiki: 'https://en.wikipedia.org/wiki/Hybrid_striped_bass',
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Hybrid_Striped_Bass.jpg/220px-Hybrid_Striped_Bass.jpg'
      },
      {
        name: 'rock bass',
        wiki: 'https://en.wikipedia.org/wiki/Rock_bass',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Rock_Bass.jpg/220px-Rock_Bass.jpg'
      },
      {
        name: 'redeye bass',
        wiki: 'https://en.wikipedia.org/wiki/Redeye_bass',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/TypicalRedeyeBassCoosaRiverNorthGeorgia.jpg/220px-TypicalRedeyeBassCoosaRiverNorthGeorgia.jpg'
      },
      {
        name: 'bluegill',
        wiki: 'https://en.wikipedia.org/wiki/Bluegill',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Lepomis_macrochirus_UMFS_2014_2.JPG/220px-Lepomis_macrochirus_UMFS_2014_2.JPG'
      },
      {
        name: 'longear sunfish',
        wiki: 'https://en.wikipedia.org/wiki/Longear_sunfish',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Lepomis_megalotis2.jpg/220px-Lepomis_megalotis2.jpg'
      },
      {
        name: 'redear sunfish',
        wiki: 'https://en.wikipedia.org/wiki/Redear_sunfish',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Redearsunfishnctc.jpg/220px-Redearsunfishnctc.jpg'
      },
      {
        name: 'redbreast sunfish',
        wiki: 'https://en.wikipedia.org/wiki/Redbreast_sunfish',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Lepomis_auritus.jpg/220px-Lepomis_auritus.jpg'
      },
      {
        name: 'green sunfish',
        wiki: 'https://en.wikipedia.org/wiki/Green_sunfish',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lepomis_cyanellus_Raver.jpg/220px-Lepomis_cyanellus_Raver.jpg'
      },
      {
        name: 'pumpkinseed',
        wiki: 'https://en.wikipedia.org/wiki/Pumpkinseed',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Lepomis_gibbosus_PAQ.jpg/220px-Lepomis_gibbosus_PAQ.jpg'
      },
      {
        name: 'warmouth',
        wiki: 'https://en.wikipedia.org/wiki/Warmouth',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chaenobryttus_gulosus.jpg/220px-Chaenobryttus_gulosus.jpg'
      },
      {
        name: 'black crappie',
        wiki: 'https://en.wikipedia.org/wiki/Black_crappie',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pomoxis_nigromaculatus1.jpg/220px-Pomoxis_nigromaculatus1.jpg'
      },
      {
        name: 'white crappie',
        wiki: 'https://en.wikipedia.org/wiki/White_crappie',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/White_Crappie.jpg/220px-White_Crappie.jpg'
      },
      {
        name: 'yellow perch',
        wiki: 'https://en.wikipedia.org/wiki/Yellow_perch',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/YellowPerch.jpg/220px-YellowPerch.jpg'
      },
      {
        name: 'walleye',
        wiki: 'https://en.wikipedia.org/wiki/Walleye',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Walleye_painting.jpg/220px-Walleye_painting.jpg'
      },
      {
        name: 'sauger',
        wiki: 'https://en.wikipedia.org/wiki/Sauger',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Saugernctc.jpg/220px-Saugernctc.jpg'
      },
      {
        name: 'saugeye',
        wiki: 'https://en.wikipedia.org/wiki/Sauger',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Saugernctc.jpg/220px-Saugernctc.jpg'
      },
      {
        name: 'chain pickerel',
        wiki: 'https://en.wikipedia.org/wiki/Chain_pickerel',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Esox_niger.jpg/240px-Esox_niger.jpg'
      },
      {
        name: 'muskellunge',
        wiki: 'https://en.wikipedia.org/wiki/Muskellunge',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Esox_masquinongyeditcrop.jpg/220px-Esox_masquinongyeditcrop.jpg'
      },
      {
        name: 'longnose gar',
        wiki: 'https://en.wikipedia.org/wiki/Longnose_gar',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Longnose_gar%2C_Boston_Aquarium.JPG/220px-Longnose_gar%2C_Boston_Aquarium.JPG'
      },
      {
        name: 'spotted gar',
        wiki: 'https://en.wikipedia.org/wiki/Spotted_gar',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lepisosteus_oculatus1.jpg/220px-Lepisosteus_oculatus1.jpg'
      },
      {
        name: 'shortnose gar',
        wiki: 'https://en.wikipedia.org/wiki/Shortnose_gar',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Lepisosteus_platostomus_drawing.jpg/220px-Lepisosteus_platostomus_drawing.jpg'
      },
      {
        name: 'alligator gar',
        wiki: 'https://en.wikipedia.org/wiki/Alligator_gar',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Alligator_Gar_10.JPG/220px-Alligator_Gar_10.JPG'
      },
      {
        name: 'rainbow trout',
        wiki: 'https://en.wikipedia.org/wiki/Rainbow_trout',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Close_up_of_rainbow_trout_fish_underwater_oncorhynchus_mykiss.jpg/220px-Close_up_of_rainbow_trout_fish_underwater_oncorhynchus_mykiss.jpg'
      },
      {
        name: 'brown trout',
        wiki: 'https://en.wikipedia.org/wiki/Brown_trout',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Salmo_trutta_Ozeaneum_Stralsund_HBP_2010-07-02.jpg/220px-Salmo_trutta_Ozeaneum_Stralsund_HBP_2010-07-02.jpg'
      },
      {
        name: 'brook trout',
        wiki: 'https://en.wikipedia.org/wiki/Brook_trout',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Brook_trout_in_water.jpg/220px-Brook_trout_in_water.jpg'
      },
      {
        name: 'cutthroat trout',
        wiki: 'https://en.wikipedia.org/wiki/Cutthroat_trout',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Trout_cutthroat_fish_oncorhynchus_clarkii_clarkii.jpg/220px-Trout_cutthroat_fish_oncorhynchus_clarkii_clarkii.jpg'
      },
      {
        name: 'lake trout',
        wiki: 'https://en.wikipedia.org/wiki/Lake_trout',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Lake_trout_fishes_salvelinus_namaycush.jpg/220px-Lake_trout_fishes_salvelinus_namaycush.jpg'
      },
      {
        name: 'channel catfish',
        wiki: 'https://en.wikipedia.org/wiki/Channel_catfish',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Ictalurus_punctatus.jpg/250px-Ictalurus_punctatus.jpg'
      },
      {
        name: 'blue catfish',
        wiki: 'https://en.wikipedia.org/wiki/Blue_catfish',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Blue_catfish.jpg/220px-Blue_catfish.jpg'
      },
      {
        name: 'flathead catfish',
        wiki: 'https://en.wikipedia.org/wiki/Flathead_catfish',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Pylodictis_olivaris.jpg/220px-Pylodictis_olivaris.jpg'
      },
      {
        name: 'yellow bullhead',
        wiki: 'https://en.wikipedia.org/wiki/Yellow_bullhead',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Ameiurus_natalis.jpg/220px-Ameiurus_natalis.jpg'
      },
      {
        name: 'brown bullhead',
        wiki: 'https://en.wikipedia.org/wiki/Brown_bullhead',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Ameiurus_nebulosus.jpg/220px-Ameiurus_nebulosus.jpg'
      },
      {
        name: 'black bullhead',
        wiki: 'https://en.wikipedia.org/wiki/Black_bullhead',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Ameiurus_melas_2021_G1.jpg/220px-Ameiurus_melas_2021_G1.jpg'
      },
      {
        name: 'bigmouth buffalo',
        wiki: 'https://en.wikipedia.org/wiki/Bigmouth_buffalo',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Bigmouth_Buffalo.jpg/220px-Bigmouth_Buffalo.jpg'
      },
      {
        name: 'smallmouth buffalo',
        wiki: 'https://en.wikipedia.org/wiki/Smallmouth_buffalo',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Smallmouth_buffalo.JPG/220px-Smallmouth_buffalo.JPG'
      },
      {
        name: 'black buffalo',
        wiki: 'https://en.wikipedia.org/wiki/Black_buffalo',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Ictiobus_niger.jpg/220px-Ictiobus_niger.jpg'
      },
      {
        name: 'freshwater drum',
        wiki: 'https://en.wikipedia.org/wiki/Freshwater_drum',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Freshwaterdrum.png/220px-Freshwaterdrum.png'
      },
      {
        name: 'bowfin',
        wiki: 'https://en.wikipedia.org/wiki/Bowfin',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amia_calva_4.jpg/220px-Amia_calva_4.jpg'
      },
      {
        name: 'lake sturgeon',
        wiki: 'https://en.wikipedia.org/wiki/Lake_sturgeon',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Acipenser_fulvescens.jpg/220px-Acipenser_fulvescens.jpg'
      },
      {
        name: 'shovelnose sturgeon',
        wiki: 'https://en.wikipedia.org/wiki/Shovelnose_sturgeon',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Scaphirhynchus_platorynchus_6.14.2014a.jpg/240px-Scaphirhynchus_platorynchus_6.14.2014a.jpg'
      },
      {
        name: 'paddlefish',
        wiki: 'https://en.wikipedia.org/wiki/Paddlefish',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Paddlefish_Polyodon_spathula.jpg/220px-Paddlefish_Polyodon_spathula.jpg'
      },
      {
        name: 'common carp',
        wiki: 'https://en.wikipedia.org/wiki/Eurasian_carp',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Cyprinus_carpio_2008_G1_%28cropped%29.jpg/220px-Cyprinus_carpio_2008_G1_%28cropped%29.jpg'
      },
      {
        name: 'grass carp',
        wiki: 'https://en.wikipedia.org/wiki/Grass_carp',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Ctenopharyngodon_idella_01_Pengo.jpg/220px-Ctenopharyngodon_idella_01_Pengo.jpg'
      }
    ];
    
    const datedSpecies = species.map(s => {
      return {
        name: s.name,
        wiki: s.wiki,
        img: s.img,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });

    await queryInterface.bulkInsert('species', datedSpecies, {});
  },
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
    *
    * Example:
    * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('species', null, {});
  }
};
