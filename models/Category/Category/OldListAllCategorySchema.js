const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OldListAllCategorySchema = new Schema({
    icon: String,
    title: String
})

module.exports = mongoose.model(' OldListAllCategory', OldListAllCategorySchema);