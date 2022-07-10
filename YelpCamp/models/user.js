const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,//it sets up an index,is not a valiation
    }
});
userSchema.plugin(passportLocalMongoose)
//this is going to add on to our schema

module.exports = mongoose.model('User', userSchema);