const mongoose = require('mongoose');

const AssPlatLivraison = mongoose.Schema({
    idPlat: {type : String},
    idDelivery: {type : String},
    status: {type : String},
    profit: {type : Number},
    dateSold: {type : String}
});

module.exports = mongoose.model('assplatlivraisons', AssPlatLivraison);