// const bcrypt = require('bcrypt');

// // const hashPassword = async (pw) => {
// //     const salt = await bcrypt.genSalt(10);
// //     const hash = await bcrypt.hash(pw, salt);
// //     console.log(salt);
// //     console.log(hash);
// // }

// const hashPassword = async (pw) => {
//     const hash = await bcrypt.hash(pw, 12);
//     console.log(hash);
// }

// const login = async (pw, hashedPw) => {
//     const result = await bcrypt.compare(pw, hashedPw);
//     if (result) {
//         console.log("Logged you in!Successful match!")
//     } else {
//         console.log("Incorrect!");
//     }
// }

// // hashPassword('monkey');
// login('monkey', '$2b$12$0.aEd6v.KFa/EHxKzdUR.u59jyLz8bDxMIXXhrcWYFgpwo023kVsS')


const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION");
    })
    .catch(err => {
        console.log("Oh no Mongo connection error!");
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' }))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    res.send('This is the home page!');
})


//there should be a form for registration:
app.get('/register', (req, res) => {
    res.render('register');
})
app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    // res.send(hash);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
    // res.send(req.body);
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, this.password);
    if (validPassword) {
        req.session.user_id = user._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
});

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    //也可以用req.session.destroy();
    res.redirect('/login');
});
app.get('/secret', requireLogin, (req, res) => {
    // if (!req.session.user_id) {
    //     return res.redirect('/login')
    // }----------------------was replaced by the middleware
    res.render('secret')
    // res.send('This is secret,you cannot see me unless you are logged in!')
})

app.listen(3000, () => {
    console.log("Serving on your app!");
})