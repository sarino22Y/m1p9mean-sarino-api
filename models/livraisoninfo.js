const mongoose = require('mongoose');

const LivraisonInfo = mongoose.Schema({
    idLivraison: {type: String},
    idDeliverer: {type: String},
    plat: {type: String},
    dateLivraison: {type: String},
    number: {type: Number},
    client: {type: String},
    status: {type: String, 
        default: "pending",
        enum: ["pending", "doing", "done"]
    }
});

module.exports = mongoose.model('livraisoninfos', LivraisonInfo);