const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShopSchema = new Schema({
    avatar: String,
    name: String,
    favorite: Number,
    vote: Number,
    comment: Number,
    lesson: Object
})

module.exports = mongoose.model('Shop', ShopSchema);