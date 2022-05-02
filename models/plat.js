const mongoose = require('mongoose');

const Plat = mongoose.Schema({
    name: {type: String},
    number: {type: Number},
    numberSold: {type: Number},
    numberRemain: {type: Number},
    price: {type: String},
    idRestaurant: {type: String}
});

module.exports = mongoose.model('plats', Plat);