//to seed your database separately from a web app just for development purpose
//第一步require mongoose 第二步require model 第三步连接mongoose 没有任何webapp,server,express,
//这个file仅仅是run on its own any time just want to get some new data in the database
const mongoose = require('mongoose');
const Product = require('./models/product'); //require the product model

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION");
    })
    .catch(err => {
        console.log("Oh no Mongo connection error!");
        console.log(err);
    })

//建立新product的方式一：
// //that's the new product:
// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// //don't forget to save
// p.save().then(p => {
//     console.log(p)
// })//如果it works 就add in a catch with an error
//     .catch(e => {
//         console.log(e);
//     })

//建立new product的方式二：insertMany()
//make an array of these products  
const seedProducts = [
    //如果有任何product没有通过validation,那么什么都不会被insert

    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
]
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })