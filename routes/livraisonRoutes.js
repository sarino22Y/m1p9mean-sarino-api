const express = require('express');
const router = express.Router();

const livraison = require('../models/livraison');
const livraisoninfo = require('../models/livraisoninfo');
const plat = require('../models/plat');

/**
 * Retourner la liste des livraison.
 */
 router.get('/livraisons', (req, res) => {
    livraison.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ livraisons: items })
    });

    console.log('Livraison Ok !!');
    
});

/**
 * Retourner une livraison par son ID.
 */
 router.get('/livraison/:idLivraison', (req, res) => {
    const ObjectId = require('mongodb').ObjectId; 
    const id = req.params.idLivraison;
    console.log("ID------------", id);
    var o_id = new ObjectId(id);
    livraison.find({
        _id: o_id
    })
    .then(livraisonFound => {
        if (!livraisonFound){
        return res.status(404).end();
        }
        // console.log(json(livraisonFound));
        return res.status(200).json(livraisonFound)
    })
    .catch(err => console.log(err));
})

/**
 * Jointure entre livraison et plats.
 */
// router.get('/livr', (req, res) => {
//     livraison.aggregate([
//         {$addFields: {
//             idPlat: {
//                 $toObjectId: "$idPlat"
//             },
//             idDeliverer: {
//                 $toObjectId: "$idDeliverer"
//             }
//           }
//         },
//         {
//             $lookup:
//             { 
//                 from: "plats",
//                 localField: "idPlat",
//                 foreignField: "_id",
//                 as: "plat"
//             }
//         },
//         {
//             $lookup:
//             {                    
//                 from: "users",
//                 localField: "idDeliverer",
//                 foreignField: "_id",
//                 as: "deliverer"
//             }
//         }], 
//        (err, items) => {
//         if (err) {
//             console.error(err)
            
//             res.status(500).json({ err: err })
//             return
//         }
//         console.log(items);
//         res.status(200).json({ livraisons: items })
//     });

//     console.log('Livraison plat Ok !!');
    
// });

/**
 * Persister un livraison.
 */
router.post('/addlivraison', (req, res, next) => {
    let newLivraison = new livraison({
        idPlat: req.body.idPlat,
        idCommande: req.body.idCommande,
        number: req.body.number,
        idDeliverer: req.body.idDeliverer,
        dateLivraison: req.body.dateLivraison,
        status: req.body.status
    });

    newLivraison.save((err, livraison) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({
                msg: "Livraison insere avec succes.",
                livraison : livraison
            });
        }
    });
});

/**
 * Mettre à jour un livraison.
 */
router.put('/livraison/:idLivraison', (req, res, next) => {
    livraison.findOneAndUpdate({ _id: req.params.idLivraison}, {
            $set: {
                status: req.body.status
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({msg: "Livraison mis à jour avec succes."});
            }
        }
    );
});

/**
 * Supprimer un livraison.
 */
router.delete('/livraison/:idLivraison', (req, res, next) => {
    livraison.deleteOne({_id: req.params.idLivraison},
        function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        }
    );
});

/**
 * Persister un livraison.
 */
 router.post('/addlivraisoninfo', (req, res, next) => {
    let newLivraisonInfo = new livraisoninfo({        
        idLivraison: req.body.idLivraison,
        dateLivraison: req.body.dateLivraison,
        number: req.body.number,
        status: req.body.status,
        plat: req.body.plat,
        client: req.body.client
    })
    console.log(req.body);

    newLivraisonInfo.save((err, livraisonInfo) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({
                msg: "Information livraison inserée avec succes.",
                livraisonInfo : livraisonInfo
        });
        }
    });
});

/**
 * Retourner l'information de livraison.
 */
 router.get('/livraisoninfos', (req, res) => {
    livraisoninfo.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ livraisoninfos: items })
    });

    console.log('Livraison Info Ok !!');    
});

/**
 * Mettre à jour un livraison Info.
 */
 router.put('/livraisoninfo/:idLivraisonInfos', (req, res, next) => {
    livraisoninfo.findOneAndUpdate({ _id: req.params.idLivraisonInfos}, {
            $set: {
                idDeliverer: req.body.idDeliverer,
                idLivraison: req.body.idLivraison,
                status: req.body.status
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    msg: "Information de livraison mis à jour avec succes.",
                    livraisoninfo: result
            });
            }
        }
    );
});

/**
 * Supprimer l'information de livraison.
 */
 router.delete('/livraisoninfo/:idLivraison', (req, res, next) => {
    livraisoninfo.deleteOne({_id: req.params.idLivraison},
        function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        }
    );
});

module.exports = router;