const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));
app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies
    // console.log(req.cookies)
    res.send(`Hey There,${name}`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'stevie chicks');
    res.send('okay send you a cookie')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('okay signed your  cookie')
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log("Serving")
})
