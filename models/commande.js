const mongoose = require('mongoose');

const Commande = mongoose.Schema({
    idCommande: {type : Number},
    idPlat: {type : Number},
    idClient: {type : Number},
    nombre: {type : Number},
    date: {type: String},
    dateLivraison: {type: String}
});

module.exports = mongoose.model('commandes', Commande);