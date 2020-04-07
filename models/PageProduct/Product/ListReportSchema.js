const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListReportSchema = new Schema({
    name: String
})

module.exports = mongoose.model('ListReportOption', ListReportSchema);