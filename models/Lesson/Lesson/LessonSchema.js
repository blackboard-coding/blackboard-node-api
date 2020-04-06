const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LessonSchema = new Schema({
    title: String,
    desc: String,
    tag: String,
    price: String,
    net: String,
    cover: String,
    view: Number
})

module.exports = mongoose.model('Lesson', LessonSchema);