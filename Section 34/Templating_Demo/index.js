const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');
console.log(redditData);

app.use(express.static(path.join(__dirname, 'public')))
//serving static assets in express && __dirname 的作用同下

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
//set 这个地方的作用就是 taking whatever the absolute path is to the index
//否则当我退出当前文件位置去获取时会失效或报错

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
        //...data spread it into the object that we pass in
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num })
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})