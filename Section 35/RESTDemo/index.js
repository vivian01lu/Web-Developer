const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }))
//these built-in parsing middlewares to parse the playload of incoming
//requests and then we can access the information in req.body
//to parse form-encoded information from the request body and any of our 
//route handler callbacks
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
//从361 build RESTful routies时开始：1：starting by adding ejs安装：npm i ejs 
//2：安装view engine:set('view engine','ejs') 然后创建views 文件夹
//3:to make sure we are doing an absolute path我们需要加入路径：
//  const path = require('path');  app.set('view',path.join(__dirname,'views'))
//4:在views 中加入三大件
//5.render all of these which are in database into template
//6.set up route:/comments 是base path,url

//用fake comments 代替数据库
const comments = [
    {
        username: 'tod',
        Comment: 'lol fun'
    },
    {
        username: 'skyler',
        Comment: 'cool'
    },
    {
        username: 'gdkl788',
        Comment: 'pls'
    },
    {
        username: 'sgfi22only',
        Comment: 'woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });//括号里面的第一个参数就是template
    //next step:pass through all of the comments in a object 

    //加入了 comments 之后，in that object now we have access to in our
    //template(comments 数据库 就可以获取 我们建立的index.ejs 模板)
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
//我们需要两个route的原因是，our form needs to submit somewhere,needs to
//send the data somewhere,it going to send it as a post request
//our GET route just to give you the form,when you submit,it sends its data as a post
//request to a different path where it's possessed and it's added in to our comments array

//一个route to serve the form itself,just a view that it's a form

//这个是上面new/comments get 的表单提交数据的地方 
app.post('/comments', (req, res) => {
    //destructure it
    const { username, comment } = req.body;
    //把这两个东西加入到array of comments 上，用push()
    comments.push({ username, comment })
    res.send("it worked!");
})

app.get('/tacos', (req, res) => {
    res.send("Get/tacos response");
})

app.post('/tacos', (req, res) => {
    //console.log(req.body);
    //也可以destructure:
    const { meat, qty } = req.body;
    res.send(`okay,there are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log("on port 3000!")
})