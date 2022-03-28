const express = require("express")
const app = express()
// console.dir(app);

/////////!!!!从来没用过！
// app.use((req, res) => {
//     console.log("we got a new request!");
//     res.send('<h1>This is my webpage</h1>');
//     // res.send("Hello,we got your request");
//     // res.send({ color: 'red' })  也可以send 对象

//     //this is actually going to send and generate a HTTP response,
//     //based upon the incoming request,and a response of a object that is going to generate a response that 
//     //will be used to generate a response that will eventually sent back to whoever request it
// })

app.get('/', (req, res) => {
    res.send('This is the home page!!!!!!!')
})

//只要有和这个'/r/sth'格式一致的均可
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);

})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID:${postId} on the ${subreddit} subreddit</h1>`);

})

app.post('/cats', (req, res) => {
    res.send('post request to /cats!!This is a diffirent request!')
})

app.get('/cats', (req, res) => {
    console.log("Cat request");
    res.send('Meow');
})

app.get('/dogs', (req, res) => {
    res.send('woof');
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('Nothing Found if nothing searched')
    }
    res.send(`<h1>Search results for:${q}</h1>`)

})

app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})



app.listen(8080, () => {
    console.log("Listening on port 8080")
})

