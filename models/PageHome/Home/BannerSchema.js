const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BannerSchema = new Schema({
    type: String,
    cover: String,
    linkto: String
})

module.exports = mongoose.model('Banner', BannerSchema);