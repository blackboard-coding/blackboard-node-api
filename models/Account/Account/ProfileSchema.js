const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
    user: Object,
    favorite: Number,
    follow: Number,
    language: String
})

module.exports = mongoose.model('UserProfile', ProfileSchema);