//creating the basic express app:app,path,views,listen,render
const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate');
//这个ejs-mate是用于设计layout的
// const Joi = require('joi');------已经在Schema中require了
//这个joi是用来在处理validation error 的（在没输入有效内容就鼠标点到其他地方时报错）
const { campgroundSchema, reviewSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review');


//在这里connect mongo:
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
// 这个好像是用来保存更新后的元素
app.use(methodOverride('_method'))

const validateCampground = (req, res, next) => {
    // //build schema for Joi,this is going to validate our data before we even attempt to save it with Mongoose

    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }

}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    // res.send('Hello from yelpcamp')
    res.render('home')
})

// app.get('/makecampground', async (req, res) => {
//     // res.render('home')
//     const camp = new Campground({ title: 'My backyard', description: 'cheap camping' });
//     await camp.save();
//     res.send(camp);
// })

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    //then pass that through to our template
    res.render('campgrounds/index', { campgrounds })

}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

//create a new campground 用post
app.post('/campgrounds', validateCampground, validateReview, catchAsync(async (req, res, next) => {
    // // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    // // if (!req.body.campground.price) {

    // // }
    // // if (!res.body.campground.image) {

    // // }---------------we are not going to write our own validation,we are going to use a tool that's been made to do just that


    const campground = new Campground(req.body.campground);
    // res.send(req.body)
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)


}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', { campground });

}))
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}))
//关于submit this edit form:forms really only send a get or post request from the browser 
//so we can fake a put,patch delete and so on using method override:需要先在bash中下载override:
//下载：npm i method-override然后需要去require override还需要app.use

//update your campground 用put
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    //也可以用findbyId 然后再update thing individually 然后save()
    //----use spread operator
    // res.send("It worked!");---after this we need try to update the campgrounds that we want to update
    res.redirect(`/campgrounds/${campground._id}`)
}))
//so now be able to set a post route as an example of put route rather a delete or patch

//make a button to send the delete request,so it's a from that will send a post request to this url
//but it's going to fake out express make it think it's a delete request bcs method override

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');

}))

app.post('/campgrounds/:id/reviews', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    /**
     * $pull:it removes from an existing array all instances of a value or values that match a specified condition
     */
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);

}))

//this can be only run if nothing else has mathced first and we didn't respond many of them
app.all('*', (req, res, next) => {
    // res.send("404!!!!!")
    next(new ExpressError('Page Not Found', 404))
})

//basic error handler:
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no,something went wrong!'
    res.status(statusCode).render('Error', { err })
    // res.send('Oh boy,somthing went wrong!')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})