const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgrounds = require('../contollers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const { route } = require('./users');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createcampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.renderEditCampground))

module.exports = router