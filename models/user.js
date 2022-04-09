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

module.exports = mongoose.model('users', User);