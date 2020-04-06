const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FreeVideoSchema = new Schema({
    title: String,
    cover: String,
    rate: String,
    total: Number
})

module.exports = mongoose.model('FreeVideo', FreeVideoSchema);