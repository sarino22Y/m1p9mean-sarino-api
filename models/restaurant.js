const mongoose = require('mongoose');

const Restaurant = mongoose.Schema({
    idRestaurant: {type : Number},
    name: {type: String},
    addres: {type: String},
    tel: {type: String}
});

module.exports = mongoose.model('restaurants', Restaurant);