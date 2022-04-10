const mongoose = require('mongoose');

const Commande = mongoose.Schema({
    namePlat: {type : String},
    nameClient: {type : String},
    adressClient: {type : String},
    mailClient: {type : String},
    nombre: {type : String},
    dateLivraison: {type: String},
    date: {type: Date}
});

module.exports = mongoose.model('commandes', Commande);