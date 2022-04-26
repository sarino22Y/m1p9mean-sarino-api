const mongoose = require('mongoose');

const Livraison = mongoose.Schema({
    idPlat: {type: String},
    idCommande: {type : String},
    dateLivraison: {type: String},
    number: {type: Number}
});

module.exports = mongoose.model('livraisons', Livraison);