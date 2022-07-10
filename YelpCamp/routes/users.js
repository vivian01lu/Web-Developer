const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { response } = require('express');

router.get('/register', (req, res) => {
    res.render('users/register');
    //we will render some template that doestn't exist
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registerUser = await User.register(user, password);
        req.flash('success', 'Welcome to YelpCamp!')
        res.redirect('/campgrounds')
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');

})
//there is more some of the more magical hand-waving stuff comes in with passports
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    res.redirect('/campgrounds');
})

router.get('/logout', (req, res) => {
    // req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
})

module.exports = router;