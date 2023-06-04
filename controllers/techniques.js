const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { technique } = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    technique.findAll()
    .then(techniques => res.render('techniques/index', { techniques: techniques.map(t => t.toJSON()) }))
    .catch(err => console.log(err));
});

router.get('/new', isLoggedIn, (req, res) => {
    return res.render('techniques/new');
});

router.get('/edit/:id', isLoggedIn, (req, res) => {
    technique.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('techniques/edit', { technique: found.toJSON() });
        } else {
            // ASK FOR HELP FROM ROME, FLASH MESSAGE NOT SHOWING
            req.flash('Technique not found.');
            res.redirect('/techniques');
        }
    })
    .catch(err => console.log(err));
});

router.get('/delete/:id', isLoggedIn, (req, res) => {
    technique.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('techniques/delete', { technique: found.toJSON() });
        } else {
            // ASK FOR HELP FROM ROME, FLASH MESSAGE NOT SHOWING
            req.flash('Technique not found.');
            res.redirect('/techniques');
        }
    })
    .catch(err => console.log(err));
});

router.get('/:id', isLoggedIn, (req, res) => {
    technique.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(found => {
        if(found) {
            return res.render('techniques/single', { technique: found.toJSON() });
        } else {
            // ASK FOR HELP FROM ROME, FLASH MESSAGE NOT SHOWING
            req.flash('Technique not found.');
            res.redirect('/techniques');
        }
    })
    .catch(err => console.log(err));
});

router.post('/new', isLoggedIn, (req, res) => {
    const insertTechnique = {...req.body};
    technique.findOrCreate({
        where: { name: insertTechnique.name }
    })
    .then((row, created) => {
        if(created) {
            req.flash(`Created technique ${row.name}`);
            res.redirect('/techniques');
        } else {
            req.flash(`Technique ${row.name} already exists`);
            res.redirect('/techniques');
        }
    })
    .catch(err => console.log(err));
});

router.put('/edit/:id', isLoggedIn, (req, res) => {
    technique.findOne({
        where: { id: parseInt(req.params.id) }
    })
    .then(foundtechnique => {
        const updateTechnique = {...req.body};
        technique.update(updateTechnique, {
            where: { id: parseInt(req.params.id) }
        })
        .then(numRowsChanged => res.redirect(`/techniques/${parseInt(req.params.id)}`))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.delete('/:id', isLoggedIn, function(req, res) {
    technique.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(numRowsDeleted => {
        req.flash(`Technique #${req.params.id} deleted`);
        res.redirect('/techniques');
    })
    .catch(err => console.log(err));
});

module.exports = router;