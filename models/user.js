const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
    name: {type: String},
    userName: {type: String},
    email: {type: String},
    adress: {type: String},
    password: {type: String},
    creationDate: {type: Date}
});

User.static.hasPassword = function hashPassword(password){
    return bcrypt.hashSync(password, 10);
}

User.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('users', User);