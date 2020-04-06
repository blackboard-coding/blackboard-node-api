const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategoryTwoSchema = new Schema({
    id: String,
    name: String,
    image: String,
    url: String
})

module.exports = mongoose.model('CategoryTwo', CategoryTwoSchema);