//初始化的步骤：①npm init -y 去生成json ②npm i express 导入express 才能继续require
const express = require('express');
const app = express();//③先require express 再调用express()
const path = require('path');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {//④用get 方法 再callback req,res 调用res.send 
    res.render('home')//pass the name of our file
})

//we first destructured it and pass through under the name of subreddit
//and in subbreddit.ejs file,,we are rendering in the title and h1
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit });
})

app.get('/cats', (req, res) => {
    const cats = [
        'blue', 'rocket', 'monty', 'step', 'winson'//pretend these are from database
    ]
    res.render('cats', { cats })
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num });
})

app.listen(3000, () => {//⑤：结尾处一致放listen localhost代码加callback console log
    console.log("Listening on port: 3000");
})

//初始化：①-⑥
//①npm init -y 去生成json
//②npm i express 导入express 才能继续require
//③先require express 再调用express()
//④用get 方法 再callback req,res 调用res.render()
//⑤：结尾处一致放listen localhost代码加callback console log
//⑥再用 nodemon index.js 使其server能自动更新

//使用express:
//⑦:app.set('view engine', 'ejs')
//⑧：安装ejs npm i ejs