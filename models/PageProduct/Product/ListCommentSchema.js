const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListCommentSchema = new Schema({
    comment: String,
    date: String,
    cuser: Object,
    liker: Number,
    like: Number
})

module.exports = mongoose.model('ListComment', ListCommentSchema);