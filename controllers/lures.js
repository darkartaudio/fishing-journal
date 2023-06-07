const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { lure, entrie } = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    lure.findAll({ order: [['name', 'ASC']] })
    .then(lures => res.render('lures/index', { lures: lures.map(l => l.toJSON()) }))
    .catch(err => console.log(err));
});

router.get('/new', isLoggedIn, (req, res) => {
    return res.render('lures/new');
});

router.get('/edit/:id', isLoggedIn, (req, res) => {
    lure.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('lures/edit', { lure: found.toJSON() });
        } else {
            req.flash('error', 'Lure not found.');
            res.redirect('/lures');
        }
    })
    .catch(err => console.log(err));
});

router.get('/delete/:id', isLoggedIn, (req, res) => {
    lure.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('lures/delete', { lure: found.toJSON() });
        } else {
            req.flash('error', 'Lure not found.');
            res.redirect('/lures');
        }
    })
    .catch(err => console.log(err));
});

router.get('/:id', isLoggedIn, (req, res) => {
    lure.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('lures/single', { lure: found.toJSON() });
        } else {
            req.flash('error', 'Lure not found.');
            res.redirect('/lures');
        }
    })
    .catch(err => console.log(err));
});

router.post('/new', isLoggedIn, (req, res) => {
    const insertLure = {...req.body};
    lure.findOrCreate({
        where: { name: insertLure.name }
    })
    .then(([row, created]) => {
        if(created) {
            req.flash('success', `Created lure '${row.name}'.`);
            res.redirect('/lures');
        } else {
            req.flash('error', `Lure ${row.name} already exists.`);
            res.redirect('/lures');
        }
    })
    .catch(err => console.log(err));
});

router.put('/edit/:id', isLoggedIn, (req, res) => {
    lure.findOne({
        where: { id: parseInt(req.params.id) }
    })
    .then(foundLure => {
        if (foundLure) {
            const updateLure = {...req.body};
            lure.update(updateLure, {
                where: { id: parseInt(req.params.id) }
            })
            .then(numRowsChanged =>  {
                if(numRowsChanged) {
                    req.flash('success', `Lure updated.`);
                    res.redirect(`/lures/${parseInt(req.params.id)}`);
                } else {
                    req.flash('error', `Lure not updated.`);
                    res.redirect(`/lures/${parseInt(req.params.id)}`);
                }
            })
            .catch(err => console.log(err));
        } else {
            req.flash('error', 'Lure not found.');
            res.redirect('/lures');
        }
    })
    .catch(err => console.log(err));
});

router.delete('/:id', isLoggedIn, function(req, res) {
    lure.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(numRowsDeleted => {
        if (numRowsDeleted > 0) {
            entrie.update({
                lureId: null
            },{
                where: { lureId: parseInt(req.params.id) }
            })
            .then(numRowsChanged => {
                req.flash('success', `Lure deleted.`);
                res.redirect('/lures');
            })
            .catch(err => console.log(err));
        } else {
            req.flash('error', 'No lures deleted.');
            res.redirect('/lures');
        }
    })
    .catch(err => console.log(err));
});

module.exports = router;