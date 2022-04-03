const express = require('express');
const router = express.Router();

const livraison = require('../models/livraison');

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
 * Persister un livraison.
 */
router.post('/addlivraison', (req, res, next) => {
    let newLivraison = new livraison({
        idLivraison: req.body.idLivraison,
        idLivreur: req.body.idLivreur,
        idCommande: req.body.idCommande,
        // date: req.body.date,
        dateLivraison: req.body.dateLivraison
    });
    console.log(req.body);

    newLivraison.save((err, livraison) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "Livraison insere avec succes."});
        }
    });
});

/**
 * Mettre à jour un livraison.
 */
router.put('/updatelivraison/:idLivraison', (req, res, next) => {
    livraison.findOneAndUpdate({ idLivraison: req.params.idLivraison}, {
            $set: {
                idRestaurant: req.body.idRestaurant,
                idLivreur: req.body.idLivreur,
                idCommande: req.body.idCommande,
                // date: req.body.date,
                dateLivraison: req.body.dateLivraison
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
    livraison.deleteOne({idLivraison: req.params.idLivraison},
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