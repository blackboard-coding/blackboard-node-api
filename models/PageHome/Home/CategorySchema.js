const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    icon: String,
    cover: String,
    title: String
})

module.exports = mongoose.model('Category', CategorySchema);