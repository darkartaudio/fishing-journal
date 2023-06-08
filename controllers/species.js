const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { specie, entrie } = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    specie.findAll({ order: [['name', 'ASC']] })
    .then(species => res.render('species/index', { species: species.map(s => s.toJSON()) }))
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
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
            req.flash('error', 'Species not found.');
            res.redirect('/species');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
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
            req.flash('error', 'Species not found.');
            res.redirect('/species');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
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
            req.flash('error', 'Species not found.');
            res.redirect('/species');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
});

router.post('/new', isLoggedIn, (req, res) => {
    const insertSpecie = {...req.body};
    specie.findOrCreate({
        where: { name: insertSpecie.name }
    })
    .then(([row, created]) => {
        if(created) {
            req.flash('success', `Created species '${row.name}'.`);
            res.redirect('/species');
        } else {
            req.flash('error', `Species '${row.name}' already exists.`);
            res.redirect('/species');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
});

router.put('/edit/:id', isLoggedIn, (req, res) => {
    specie.findOne({
        where: { id: parseInt(req.params.id) }
    })
    .then(foundSpecie => {
        if (foundSpecie) {
            const updateSpecie = {...req.body};
            specie.update(updateSpecie, {
                where: { id: parseInt(req.params.id) }
            })
            .then(numRowsChanged => {
                if (numRowsChanged) {
                    req.flash('success', 'Species updated.');
                    res.redirect(`/species/${parseInt(req.params.id)}`);
                } else {
                    req.flash('error', 'Species not updated.');
                    res.redirect(`/species/${parseInt(req.params.id)}`);
                }
            })
            .catch(err => { 
                console.log(err);
                req.flash('error', 'Server error.');
                res.redirect('/');
            });
        } else {
            req.flash('error', 'Species not found.');
            res.redirect('/species');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
});

router.delete('/:id', isLoggedIn, function(req, res) {
    specie.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(numRowsDeleted => {
        if (numRowsDeleted > 0) {
            entrie.update({
                specieId: null
            },{
                where: { specieId: parseInt(req.params.id) }
            })
            .then(numRowsChanged => {
                req.flash('success', `Species deleted.`);
                res.redirect('/species');
            })
            .catch(err => { 
                console.log(err);
                req.flash('error', 'Server error.');
                res.redirect('/');
            });
        } else {
            req.flash('error', 'No species deleted.');
            res.redirect('/species');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', err.name);
        res.redirect(`/species/${parseInt(req.params.id)}`);
    });
});

module.exports = router;