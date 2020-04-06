const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListVideoInCategorySchema = new Schema({
    image: String,
    title: String,
    rating: String,
    count: Number,
    price: String,
    discount: String,
    net: String,
    favorite: Number
})

module.exports = mongoose.model(' ListVideoInCategory', ListVideoInCategorySchema);