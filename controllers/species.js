const moment = require('moment');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { entrie, lure, specie, technique, user, watershed } = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    specie.findAll()
    .then(species => res.render('species/index', { species: species.map(s => s.toJSON()) }))
    .catch(err => console.log(err));
});