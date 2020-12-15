const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const accountStudent = new Schema({
    userName: { type: String, require: true, unique: true },
    hashPassword: { type: String, require: true },
});

accountStudent.pre('save', async function() {
    let isHash = this.hashPassword;
    this.hashPassword = await bcrypt.hash(isHash, saltRounds);
});

module.exports = mongoose.model('Account', accountStudent);