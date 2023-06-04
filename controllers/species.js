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

router.get('/new', isLoggedIn, (req, res) => {
    return res.render('species/new');
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

router.get('/delete/:id', isLoggedIn, (req, res) => {
    specie.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('species/delete', { specie: found.toJSON() });
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

router.post('/new', isLoggedIn, (req, res) => {
    const insertSpecie = {...req.body};
    specie.findOrCreate({
        where: { name: insertSpecie.name }
    })
    .then((row, created) => {
        if(created) {
            req.flash(`Created species ${row.name}`);
            res.redirect('/species');
        } else {
            req.flash(`Species ${row.name} already exists`);
            res.redirect('/species');
        }
    })
    .catch(err => console.log(err));
});

module.exports = router;