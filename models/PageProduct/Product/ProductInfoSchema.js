const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductInfoSchema = new Schema({
    product: Object,
    vdo_list: Array,
    owner: Object
})

module.exports = mongoose.model('ProductInfo', ProductInfoSchema);