const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number
})

module.exports = mongoose.model("Review", reviewSchema)
//we are going to connect a review with a campground or multiple reviews,so this is a one to many relationship
