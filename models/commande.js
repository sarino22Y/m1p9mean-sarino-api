const mongoose = require('mongoose');

const Commande = mongoose.Schema({
    namePlat: {type : String},
    nameClient: {type : String},
    adressClient: {type : String},
    mailClient: {type : String},
    nombre: {type : String},
    dateLivraison: {type: String},
    date: {type: String}
});

module.exports = mongoose.model('commandes', Commande);