const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CertificationSchema = new Schema({
    name: String,
    file: String,
    status: Number
})

module.exports = mongoose.model('Certification', CertificationSchema);