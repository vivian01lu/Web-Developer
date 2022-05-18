const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/JobMarket', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION");
    })
    .catch(err => {
        console.log("Oh no error!");
        console.log(err);
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})
personSchema.virtual('fullName').get(function () {
    return `${this.first}${this.last}`
})

//Defining moogoose middleware
personSchema.pre('save', async function () {
    this.first = 'YO';
    this.last = 'Mama'
    console.log("About to save");
})

personSchema.post('save', async function () {
    console.log("just saved")
})

const Person = mongoose.model('Person', personSchema);