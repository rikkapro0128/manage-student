const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { subSchems } = require('./subSchems.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const account = new Schema({
    fullName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    hashPassword: { type: String, require: true },
    infoAccount: {
        lastName: { type: String, default: '' },
        firstName: { type: String, default: '' },
        age: { type: Number, default: 0 },
        gender: { type: String, default: 'Nam' },
        avatar: { type: String, default: '' },
    },
});

account.pre('save', async function() {
    let isHash = this.hashPassword;
    this.hashPassword = await bcrypt.hash(isHash, saltRounds);
});

module.exports = mongoose.model('Account', account);