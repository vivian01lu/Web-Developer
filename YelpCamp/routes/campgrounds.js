const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgrounds = require('../contollers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');



router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

//create a new campground 用post
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createcampground))

router.get('/:id', catchAsync(campgrounds.showCampground))

router.get('/:id/edit',
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.renderEditCampground))


router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
//so now be able to set a post route as an example of put route rather a delete or patch

//make a button to send the delete request,so it's a from that will send a post request to this url
//but it's going to fake out express make it think it's a delete request bcs method override

router.delete('/:id', isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router