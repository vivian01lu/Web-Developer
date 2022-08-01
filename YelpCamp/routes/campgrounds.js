const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../contollers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
//now we've told the multer to store things in a different destination
//instead of storing things in our uploads folder locally,we should remove that


const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createcampground))
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send("It worked!")
// })
//.post(upload.single('image')) --- 这个名字是在new.ejs里自定义的 ------single 是上传一张照片，array 是上传一组


//inorder to parse multipart forms we should use another middleware ---> multer
//multer adds a body object and a file object to the request object

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.renderEditCampground))

module.exports = router;