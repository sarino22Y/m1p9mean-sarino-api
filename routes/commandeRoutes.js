const express = require('express');
const router = express.Router();

const commande = require('../models/commande');

/**
 * Retourner la liste des commande.
 */
 router.get('/commandes', (req, res) => {
    commande.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ commandes: items })
    });

    console.log('Commande Ok !!');
    
});

/**
 * Persister un commande.
 */
router.post('/addcommande', (req, res, next) => {
    let newCommande = new commande({
        idCommande: req.body.idCommande,
        idPlat: req.body.idPlat,
        idClient: req.body.idClient,
        nombre: req.body.nombre,
        date: req.body.date,
        dateLivraison: req.body.dateLivraison
    });
    console.log(req.body);

    newCommande.save((err, commande) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "Commande insere avec succes."});
        }
    });
});

/**
 * Mettre à jour un commande.
 */
router.put('/updatecommande/:idCommande', (req, res, next) => {
    commande.findOneAndUpdate({ idCommande: req.params.idCommande}, {
            $set: {
                idPlat: req.body.idPlat,
                idClient: req.body.idClient,
                nombre: req.body.nombre,
                date: req.body.date,
                dateLivraison: req.body.dateLivraison
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({msg: "Commande mis à jour avec succes."});
            }
        }
    );
});


/**
 * Supprimer un commande.
 */
router.delete('/commande/:idCommande', (req, res, next) => {
    commande.deleteOne({idCommande: req.params.idCommande},
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