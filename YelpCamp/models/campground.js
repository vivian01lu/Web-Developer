//campground model basics
//1:require mongoose:
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
})

//export this at the end:
module.exports = mongoose.model('Campground', CampgroundSchema); 