const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }

app.use(session(sessionOptions));

app.get('/pagecount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})

app.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/great')
})

app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`welcome back,${username}`)
})

app.listen(3000, () => {
    console.log("serving app on localhost")
})