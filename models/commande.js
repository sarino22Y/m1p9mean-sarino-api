const mongoose = require('mongoose');

const Commande = mongoose.Schema({
    namePlat: {type : String},
    nameClient: {type : String},
    idClient: {type : String},
    adressClient: {type : String},
    emailClient: {type : String},
    number: {type : Number},
    dateLivraison: {type: String},
    date: {type: String}
});

module.exports = mongoose.model('commandes', Commande);