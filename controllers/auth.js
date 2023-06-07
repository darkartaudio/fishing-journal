const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const { user } = require('../models');

router.get("/signup", (req, res) => {
  return res.render("auth/signup");
});

router.get("/login", (req, res) => {
  return res.render("auth/login");
});

router.get('/logout', function(req, res){
  req.logOut(function(err, next) {
    if (err) { return next(err); }
    req.flash('success', 'Logged out.');
    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/entries',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back!',
  failureFlash: 'Either email or password is incorrect.' 
}));

router.post('/signup', async (req, res) => {
  // we now have access to the user info (req.body);
  const { email, name, password, timezone } = req.body; // goes and us access to whatever key/value inside of the object
  try {
    const [_user, created] = await user.findOrCreate({
        where: { email },
        defaults: { name, password, timezone: parseInt(timezone) }
    });

    if (created) {
        // if created, success and we will redirect back to / page
        console.log(`----- ${_user.name} was created -----`);
        const successObject = {
            successRedirect: '/entries',
            successFlash: `Welcome ${_user.name}!`
        }
        // 
        passport.authenticate('local', successObject)(req, res);
    } else {
      // Send back email already exists
      req.flash('error', 'Email already exists.');
      res.redirect('/auth/signup'); // redirect the user back to sign up page to try again
    }
  } catch (error) {
        // There was an error that came back; therefore, we just have the user try again
        console.log('**************Error');
        console.log(error);
        req.flash('error', 'Either email or password is incorrect. Please try again.');
        res.redirect('/auth/signup');
  }
});

module.exports = router;