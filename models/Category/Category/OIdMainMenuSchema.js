const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OldMainMenuSchema = new Schema({
    name: String,
    image: String,
    url: String
})

module.exports = mongoose.model('OldMainMenu', OldMainMenuSchema);