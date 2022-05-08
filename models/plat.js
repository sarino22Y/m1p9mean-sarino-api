const mongoose = require('mongoose');

const Plat = mongoose.Schema({
    idRestaurant: {type: String},
    name: {type: String},
    number: {type: Number},
    numberSold: {type: Number},
    numberRemain: {type: Number},
    price: {type: Number},
    expense: {type: Number},
    profit: {type: Number,
        default: 0},
    status: {type: String,
        default: "sell",
        enum: ["sell", "sold"]}
});

module.exports = mongoose.model('plats', Plat);