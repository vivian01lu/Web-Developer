//creating the basic express app:app,path,views,listen,render
const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate');
//这个ejs-mate是用于设计layout的
const methodOverride = require('method-override');
const Campground = require('./models/campground')

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

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    //then pass that through to our template
    res.render('campgrounds/index', { campgrounds })

})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    // res.send(req.body)
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });

})
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
})
//关于submit this edit form:forms really only send a get or post request from the browser 
//so we can fake a put,patch delete and so on using method override:需要先在bash中下载override:
//下载：npm i method-override然后需要去require override还需要app.use

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    //也可以用findbyId 然后再update thing individually 然后save()
    //----use spread operator
    // res.send("It worked!");---after this we need try to update the campgrounds that we want to update
    res.redirect(`/campgrounds/${campground._id}`)
})
//so now be able to set a post route as an example of put route rather a delete or patch

//make a button to send the delete request,so it's a from that will send a post request to this url
//but it's going to fake out express make it think it's a delete request bcs method override

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})