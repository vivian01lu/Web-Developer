const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION");
    })
    .catch(err => {
        console.log("Oh no error!");
        console.log(err);
    })

//记住如何创建Schema：调用的是new了mongoose的Schema()方法
const productSchema = new mongoose.Schema({
    // name:String,
    // price:Number,-----the former way we set the type of these variables

    name: {
        //需要加入一些built-in validation: required validation
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive ya dodo!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});


productSchema.methods.greet = function () {
    console.log("Hello!!Hi!!Howdy");
    console.log(`-from ${this.name}`);
}
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();//it behaves like a promise,can await it somewhere else
}
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}


//pass in model name(singular capitalize first letter) and schema to creat a class
const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    //seriously,i still don't know the use of "await"
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct);
}
// findProduct();
Product.fireSale().then(res => console.log(res))

// const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cyling'], size: 'XS' })

// bike.save()
//     .then(data => {
//         console.log("It worked")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("oh no error")
//         console.log(err);
//     })


// //give a data back
// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -10 }, { new: true, runValidators: true })
//     //we updated it as a price of -10.9
//     //在进行update的时候设置runValidators为true保证上面validation的有效性
//     .then(data => {
//         console.log("It worked")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("oh no error")
//         console.log(err);
//     })