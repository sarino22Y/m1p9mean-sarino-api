const mongoose = require('mongoose');

const User = mongoose.Schema({
    idUser: {type : Number},
    name: {type: String},
    address: {type: String},
    tel: {type: String}
});

module.exports = mongoose.model('users', User);