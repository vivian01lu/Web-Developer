const express = require('express');
const app = express();
const morgan = require('morgan');
const ApppError = require('./AppError')



// app.use(() => {
//     console.log("heyyy")
// })-----------app.use will allow us to run code on every single request

app.use(
    morgan('tiny')//Morgan is a useful logging tool
    //tell the express on every single request use this Morgan middleware
)

// app.use((req, res, next) => {
//     console.log("This is my first middleware")
//     return next();
//     console.log("This is my first middleware after next()");
// })

// app.use((req, res, next) => {
//     console.log("This is my second middleware")
//     next();

// })
app.use((req, res, next) => {
    req.requestTime = Date.now()
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("i love dog");
    next();
})

const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new ApppError('password required!', 401);
    // res.send('sorry you need a password')
    // throw new ApppError(401,'Password required!')
})

app.get('/', (req, res) => {
    console.log(`Request date:${req.requestTime}`)
    res.send('home page')
})

app.get('/error', (req, res) => {
    chicken.fly();
})
app.get('/dogs', (req, res) => {
    console.log(`Request date:${req.requestTime}`)
    res.send('woof')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send("i have a secret")
})
app.use((req, res) => {
    res.status(404).send("not found")
})

//this is a custom error handler that we set up
app.use((err, req, res, next) => {
    console.log("************")
    console.log("******Error******")
    console.log("************")
    // res.status(500).send("Oh boy,we got an error")
    next(err);//一定要把error传进去才是call next error handler 否则就是next middle ware
    //in next,when we pass something in,it's going to trigger it and will call next
    //error handling middleware

    //this will only run bcs it's at the end of the app or it's at the end of our app definition
    //it will only run if we never sent back anything before,if we never ended the cycle
    //by matching one of these routes
})

app.listen(3000, () => {
    console.log("App is running")
})
