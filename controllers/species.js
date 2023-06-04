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

router.get('/edit/:id', isLoggedIn, (req, res) => {
    specie.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('species/edit', { specie: found.toJSON() });
        } else {
            // ASK FOR HELP FROM ROME, FLASH MESSAGE NOT SHOWING
            req.flash('Species not found.');
            res.redirect('/species');
        }
    })
    .catch(err => console.log(err));
});

router.get('/:id', isLoggedIn, (req, res) => {
    specie.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('species/single', { specie: found.toJSON() });
        } else {
            // ASK FOR HELP FROM ROME, FLASH MESSAGE NOT SHOWING
            req.flash('Species not found.');
            res.redirect('/species');
        }
    })
    .catch(err => console.log(err));
});

module.exports = router;