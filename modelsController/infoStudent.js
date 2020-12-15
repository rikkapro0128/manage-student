const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelStudent = new Schema({
    name: String,
    gender: String,
    birthday: Date,
});

module.exports = mongoose.model('Student', modelStudent);