const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReportProductSchema = new Schema({
    pid: String,
    opt: String,
    message: String
})

module.exports = mongoose.model('ReportProduct', ReportProductSchema);