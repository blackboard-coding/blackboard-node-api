const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VideoSchema = new Schema({
    name: String,
    description: String,
    image: String,
    rate: Object,
    price: String
})

module.exports = mongoose.model('Video', VideoSchema);