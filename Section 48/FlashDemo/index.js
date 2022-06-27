//----------------Express and Mongoose basic setup
const express = require('express');
const app = express();//set app equal to the result of executing express
const path = require('path');//import path
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash')

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());


mongoose.connect('mongodb://localhost:27017/farmStand2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION");
    })
    .catch(err => {
        console.log("Oh no Mongo connection error!");
        console.log(err);
    })
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//这个地方不太记得

app.use(express.urlencoded({ extended: true }))//这里也是


/**
 * 用一个middle ware解决flash需要重复添加的问题
 */
app.use((req, res, next) => {
    res.locals.messages = req.flash(success);
    next();
})
/**
 * 这里取的代码不对，应该用farms那个举例子但是我没找到
 * 
 * 这里的flash 加入的位置：
 * app.get('/farms),aysnc(req,res)=>{
 *      const farms = await Farms.find({});
 *      res.render('farms/index',{farm,message:req.flash('succcess')})
 * }
 * ....
 * ...
 * app.post('/farms',async(req,res)=>{
 *      const farm = new Farm(req.body);
 *      await farm.save();
 *      req.flash('success','sucessfully made a ne form');
 *      res.redirect('/farms');
 * })
 * 
 * calling request flash before we redirect,then whenever we request to,just
 * retrieve anything under the key of success that's been restored there
 */


app.listen(3000, () => {
    console.log("App is listening on port 3000!")//call back
})

