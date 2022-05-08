const express = require('express');
const router = express.Router();

const platDelivery = require('../models/assPlatLivraison');

/**
 * Retourner la liste des plats livrés.
 */
router.get('/assplatlivraisons', (req, res) => {
    platDelivery.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ platlivraisons: items })
    });

    console.log('Plat livré Ok !!');
    
});

/**
 * Retourner un plat livré par son ID.
 */
// router.get('/assPlatLivraisons/:idPlat', (req, res) => {
//     const ObjectId = require('mongodb').ObjectId; 
//     const id = req.params.idPlat;
//     console.log("ID------------", id);
//     var o_id = new ObjectId(id);
//     plat.find({
//         _id: o_id
//     })
//     .then(platFound => {
//         if (!platFound){
//         return res.status(404).end();
//         }
//         // console.log(json(platFound));
//         return res.status(200).json(platFound)
//     })
//     .catch(err => console.log(err));
// })

/**
 * Persister assplatlivraisons.
 */
router.post('/addassplatlivraisons', (req, res, next) => {
    let newPlatDelivery = new platDelivery({
        idPlat: req.body.idPlat,
        idDelivery: req.body.idDelivery,
        status: "sold",
        profit:  req.body.profit,
        dateSold: req.body.dateSold
    });
    console.log(req.body);

    newPlatDelivery.save((err, plat) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "Plat livraison, inséré avec succes."});
        }
    });
});


/**
 * Supprimer un assPlatLivraison.
 */
router.delete('/assplatlivraisons/:idassplatlivraisons', (req, res, next) => {
    platDelivery.deleteOne({_id: req.params.idassplatlivraisons},
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