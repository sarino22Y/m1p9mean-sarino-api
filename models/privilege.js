const mongoose = require('mongoose');

const Privilege = mongoose.Schema({
    idPrivilege: {type : Number},
    name: {type : String}
});

module.exports = mongoose.model('privileges', Privilege);