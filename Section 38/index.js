//----------------Express and Mongoose basic setup
const express = require('express');
const app = express();//set app equal to the result of executing express
const path = require('path');//import path
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const Product = require('./models/product'); //require our model
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use(methodOverride('_method'))
const categories = ['fruit', 'vegetable', 'dairy', 'mushroom'];

app.get('/products', async (req, res) => {//这里的req,res也不记得了
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })//其实我也忘记这个render是干啥的了555
    } else {
        const products = await Product.find({})    //an empty brackets means to find all items but that takes time,we can use 'ansyc' and 'await'
        res.render('products/index', { products, category: 'All' })
    }

    // console.log(products)
    //当在views中设置了ejs view engine后，我们可以去调用render

    // res.send("all products will be here")
})
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})//then we should make sure we set up the route where the submits to

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    // console.log(req.body)
    await newProduct.save();
    // console.log(newProduct)
    // res.send('making your product')
    res.redirect(`/products/${newProduct._id}`);

})//we need tell the express to use that middleware
app.get('/products/:id', async (req, res) => {
    //destructure it
    const { id } = req.params;//吓，params好眼熟可我不记得
    const product = await Product.findById(id)
    console.log(product);
    // res.send('details page!')
    res.render('products/show', { product })
})
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    // console.log(req.body)//So can make sure the information is come from the form
    // res.send('PUT!!');
    res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log("App is listening on port 3000!")//call back
})

