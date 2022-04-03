const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

//p365:The UUID package:
//anytime i call uuid i will get a new universally unique identiier
const { v4: uuid } = require('uuid');//v4：uuid 的目的是更改了其名称


app.use(express.urlencoded({ extended: true }))
//these built-in parsing middlewares to parse the playload of incoming
//requests and then we can access the information in req.body
//to parse form-encoded information from the request body and any of our 
//route handler callbacks
app.use(express.json());

app.use(methodOverride('_method'));
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
let comments = [
    {
        id: uuid(),
        username: 'tod',
        Comment: 'lol fun'
    },
    {
        id: uuid(),
        username: 'skyler',
        Comment: 'cool'
    },
    {
        id: uuid(),
        username: 'gdkl788',
        Comment: 'pls'
    },
    {
        id: uuid(),
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
    comments.push({ username, comment, id: uuid() })

    //P363:Express Redirects
    // res.send("it worked!");
    //不要去render something from our post route,我们要redirect用户某个地方,于是就直接
    //redirect the user back to our index where all of the comments are

    res.redirect('/comments');
})

//p364 RESTful Comments Show
app.get('/comments/:id', (req, res) => {
    //所以还要在上面的fake 数据库中加入id 属性
    const { id } = req.params;//把参数extract 便于使用
    //这里是为了用Correct id找出正确的post
    //但是这里的id 却由于来源 req.params 因此是一个String 需要转化
    //但是用了uuid() 后这里就成为了一个Integer
    const comment = comments.find(c => c.id === id)

    res.render('comments/show', { comment });
    //因此要新建一个template show.ejs
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })

})

//p.366:patch() request is to partially modify something
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;//把参数extract 便于使用
    const newCommentText = req.body.comment;//and take whatever was sent in the
    //request body comment,that's the payload

    const foundComment = comments.find(c => c.id === id)//然后再用这个iD尽可能找到这个Comment

    //若找到了这个id:就进行更新：把这个 foundComment 对象的Comment属性更改了
    foundComment.comment = newCommentText
    //and then we need to update that comment based upon some
    //payload that was sent to the request body

    //用reDirect 目的：我们不想从patch路径中去respond,所以我们可以redirect所以我们可以重新start
    res.redirect('/comments');
})


app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // const foundComment = comments.find(c => c.id === id)
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
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