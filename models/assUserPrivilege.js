const mongoose = require('mongoose');

const AssUserPrivilege = mongoose.Schema({
    idAssUserPrivilege: {type : Number},
    idUser: {type : Number},
    idPrivilege: {type : Number},
});

module.exports = mongoose.model('assuserprivileges', AssUserPrivilege);