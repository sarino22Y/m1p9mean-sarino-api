const mongoose = require('mongoose');

const Plat = mongoose.Schema({
    idPlat: {type : Number},
    name: {type: String},
    number: {type: Number},
    price: {type: String}
});

module.exports = mongoose.model('plats', Plat);