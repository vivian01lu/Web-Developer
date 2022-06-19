const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,//remember how to set constraints
    },
    category: {
        type: String,
        lowercase: true,//just in case there is capital letter
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

const Product = mongoose.model('Product', productSchema);//then we need to compile our model
module.exports = Product;//export that from the file
