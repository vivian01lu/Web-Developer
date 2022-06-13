//1、connect to the database
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION");
    })
    .catch(err => {
        console.log("Oh no Mongo connection error!");
        console.log(err);
    })


const userSchema = new Schema({
    username: String,
    age: Number
})

//tweet schema:
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 });
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock my chickens make noises', likes: 123 });
//     tweet2.user = user;//associate them again
//     //take the entire project representing a user and set it as a user property and treat it
//     //as if the entire thing is being stored there
//     user.save();
//     tweet2.save();
// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    /**
populate all fields for each user 
populate is basically it's going to build a more complicated query behind the scenes
that it then sends to Mongo
     */
    console.log(t);
}
findTweet();


