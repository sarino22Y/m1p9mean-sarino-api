const express = require('express');
const router = express.Router();

const plat = require('../models/plat');

/**
 * Retourner la liste des plat.
 */
 router.get('/plats', (req, res) => {
    plat.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ plats: items })
    });

    console.log('Plat Ok !!');
    
});

/**
 * Persister un plat.
 */
router.post('/addplat', (req, res, next) => {
    let newPlat = new plat({
        name: req.body.name,
        number: req.body.number,
        price: req.body.price
    });
    console.log(req.body);

    newPlat.save((err, plat) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "Plat insere avec succes."});
        }
    });
});

/**
 * Mettre à jour un plat.
 */
router.put('/updateplat/:idPlat', (req, res, next) => {
    plat.findOneAndUpdate({ idPlat: parseInt(req.params.idPlat)}, {
            $set: {
                name: req.body.name,
                number: parseInt(req.body.number),
                price: req.body.price
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({msg: "Plat mis à jour avec succes."});
            }
        }
    );
});


/**
 * Supprimer un plat.
 */
router.delete('/plat/:idPlat', (req, res, next) => {
    plat.deleteOne({idPlat: req.params.idPlat},
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