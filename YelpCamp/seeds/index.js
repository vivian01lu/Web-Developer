//copy from app.js 除了不需要express和path
//建立seeds的目的：想让这个run on its own anytime separately from our node
const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptora, descriptors } = require('./seedHelpers')

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];//we pass in the array and then return the random element from the array

const seedDB = async () => {
    await Campground.deleteMany({});//把之前的都删除
    // const c = new Campground({ title: 'purple field' });
    // await c.save()

    //----可以在这里进行循环：
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)}${sample(places)}`
        })
        await camp.save();
    }

}

//final thing is to close database connection
seedDB().then(() => { //bc it's an async func
    mongoose.connection.close();
});