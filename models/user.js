const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
    name: {type: String},
    username: {type: String},
    email: {type: String},
    adress: {type: String},
    role: {type: String, 
            default: "client",
            enum: ["client", "restaurant", "deliverer","ekaly"]
        },
    password: {type: String},
    creationDate: {type: Date}
});

User.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password, 10);
}

User.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('users', User);