const mongoose = require('mongoose');

const Livraison = mongoose.Schema({
    idLivraison: {type : Number},
    idLivreur: {type : Number},
    idCommande: {type : Number},
    ///date: {type: String},
    dateLivraison: {type: String}
});

module.exports = mongoose.model('livraisons', Livraison);