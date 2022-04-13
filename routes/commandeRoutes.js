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
    const dateCommante = Date.now();
    const today = new Date(dateCommante);
    const td = today.toUTCString();
    const dateLivraison = req.body.dateLivraison;
    const dateLivraisonFormated = dateLivraison.replace("T", " à ")
                                                .replace(":", " h ");

    let newCommande = new commande({
        namePlat: req.body.namePlat,
        nameClient: req.body.nameClient,
        adressClient: req.body.adressClient,
        mailClient: req.body.mailClient,
        nombre: req.body.nombre,
        dateLivraison: dateLivraisonFormated,
        date: td
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
    commande.findOneAndUpdate({ _id: req.params.idCommande}, {
            $set: {
                namePlat: req.body.namePlat,
                nameClient: req.body.nameClient,
                adressClient: req.body.adressClient,
                mailClient: req.body.mailClient,
                nombre: req.body.nombre,
                dateLivraison: req.body.dateLivraison,
                date: Date.now()
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
    commande.deleteOne({_id: req.params.idCommande},
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