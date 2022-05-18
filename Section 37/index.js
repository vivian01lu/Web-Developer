const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION");
    })
    .catch(err => {
        console.log("Oh no error!");
        console.log(err);
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})
//mongoose will make a collection as 'movies',
//pluralize it and lowercase it.
const Movie = mongoose.model('Movie', movieSchema);
//now we have a model class called Movie
//但是现在可以创建一些movie class 的new instances并将其保存到Mongo Database里
// const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' })

// //去添加数据的方式，可以直接创建一些class的instance也可以用insertMany的方式更快的创建新的对象
// //但是如果我们用insertMany we're just going to basically direct line into Mongo and insert all of this
// Movie.insertMany([
//     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
//     { title: 'Alien', year: 1979, score: 7.5, rating: 'PG' },
// ])
//     .then(data => {
//         console.log("It worked");
//         console.log(data);//where the hell this data come from?
//     })
