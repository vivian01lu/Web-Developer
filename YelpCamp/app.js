if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
console.log(process.env.SECRET)

//creating the basic express app:app,path,views,listen,render
const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate');
//这个ejs-mate是用于设计layout的
// const Joi = require('joi');------已经在Schema中require了
//这个joi是用来在处理validation error 的（在没输入有效内容就鼠标点到其他地方时报错）

const session = require('express-session');
const flash = require('connect-flash');

const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override');
const passport = require('passport');//passport is used to allow us to plug in multiple strategies for authentication
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const userRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');

//在这里connect mongo:
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:false

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
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//this is telling a password how to serialize a user (how do we get data,how do we store a user in the session)
passport.deserializeUser(User.deserializeUser());//how do you get the a user out of that session

//create a middle ware before routes handler to use show flash template
app.use((req, res, next) => {
    console.log(req.session);
    res.locals.currentUser = req.user;//so that in all template i now have access to current user
    res.locals.success = req.flash('success');
    //whatever this is,just a recap we'll have access to our templates
    //we don't have to pass it through
    res.locals.error = req.flash('error');
    next();
})

//fake a user
app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'coltttt@gmail.com', username: 'coltttt' })
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundsRoutes)
app.use('/campgrounds/:id/reviews', reviewsRoutes)

app.get('/', (req, res) => {
    // res.send('Hello from yelpcamp')
    res.render('home');
})

// app.get('/makecampground', async (req, res) => {
//     // res.render('home')
//     const camp = new Campground({ title: 'My backyard', description: 'cheap camping' });
//     await camp.save();
//     res.send(camp);
// })

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