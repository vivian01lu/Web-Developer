const { campgroundSchema, reviewSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground');
const Review = require('./models/review');



module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ.USER...", req.user);
    //passport起作用：it is going to be automatically filled in with the deserialized info from the session

    //store the url they are requesting
    if (!req.isAuthenticated()) {
        // console.log(req.path, req.orignalUrl);
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You need to be signed in!');
        return res.redirect('/login');
    }
    next();
}



module.exports.validateCampground = (req, res, next) => {
    // //build schema for Joi,this is going to validate our data before we even attempt to save it with Mongoose

    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }

}
//create 一个不是当前用户就不能删除campground的middleware:
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}
// campgrounds/id/reviews/reviewId
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
