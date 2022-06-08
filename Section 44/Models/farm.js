//1、connect to the database
const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION");
    })
    .catch(err => {
        console.log("Oh no Mongo connection error!");
        console.log(err);
    })

//先设计Schema
const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});
//然后在创建第二个model
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Type.ObjectId, ref: 'Product' }],
})

//再用model方法建立
const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);
//用insertMany()将这个model填入数据
// Product.insertMany([
//     { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//     { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
//     { name: 'Asparagus', price: 3.99, season: 'Spring' },
// ])

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda,CA' });
//     const melon = await Product.findOne({ name: 'Goddess Melon' });
//     farm.products.push(melon)
//     await farm.save();
// }



const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
    farm.products.push(watermelon)
    awaitfarm.save()
}

//mongoose populate
Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')
    .then(farm => console.log(farm))