const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { technique, entrie } = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    technique.findAll({ order: [['name', 'ASC']] })
    .then(techniques => res.render('techniques/index', { techniques: techniques.map(t => t.toJSON()) }))
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
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
            req.flash('error', 'Technique not found.');
            res.redirect('/techniques');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
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
            req.flash('error', 'Technique not found.');
            res.redirect('/techniques');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
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
            req.flash('error', 'Technique not found.');
            res.redirect('/techniques');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
});

router.post('/new', isLoggedIn, (req, res) => {
    const insertTechnique = {...req.body};
    technique.findOrCreate({
        where: { name: insertTechnique.name }
    })
    .then(([row, created]) => {
        if(created) {
            req.flash('success', `Created technique '${row.name}'.`);
            res.redirect('/techniques');
        } else {
            req.flash('error', `Technique '${row.name}' already exists.`);
            res.redirect('/techniques');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
});

router.put('/edit/:id', isLoggedIn, (req, res) => {
    technique.findOne({
        where: { id: parseInt(req.params.id) }
    })
    .then(foundTechnique => {
        if (foundTechnique) {
            const updateTechnique = {...req.body};
            technique.update(updateTechnique, {
                where: { id: parseInt(req.params.id) }
            })
            .then(numRowsChanged => {
                if(numRowsChanged) {
                    req.flash('success', `Technique updated.`);
                    res.redirect(`/techniques/${parseInt(req.params.id)}`);
                } else {
                    req.flash('error', 'Technique not updated.');
                    res.redirect(`/techniques/${parseInt(req.params.id)}`);
                }
            })
            .catch(err => { 
                console.log(err);
                req.flash('error', 'Server error.');
                res.redirect('/');
            });
        } else {
            req.flash('error', 'Technique not found.');
            res.redirect('/techniques');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', 'Server error.');
        res.redirect('/');
    });
});

router.delete('/:id', isLoggedIn, function(req, res) {
    technique.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(numRowsDeleted => {
        if (numRowsDeleted > 0) {
            entrie.update({
                techniqueId: null
            },{
                where: { techniqueId: parseInt(req.params.id) }
            })
            .then(numRowsChanged => {
                req.flash('success', `Technique deleted.`);
                res.redirect('/techniques');
            })
            .catch(err => { 
                console.log(err);
                req.flash('error', 'Server error.');
                res.redirect('/');
            });
        } else {
            req.flash('error', 'Technique not deleted.');
            res.redirect('/techniques');
        }
    })
    .catch(err => { 
        console.log(err);
        req.flash('error', err.name);
        res.redirect(`/techniques/${parseInt(req.params.id)}`);
    });
});

module.exports = router;