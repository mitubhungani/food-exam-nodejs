const mongoose = require('mongoose');

const foodSchema =new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    image:String,
    addedBy:String
},
{timestamps:true})

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;