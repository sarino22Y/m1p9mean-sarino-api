const express = require('express');
const router = express.Router();

const plat = require('../models/plat');

/**
 * Retourner la liste des plats.
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
 * Retourner un plat par son ID.
 */
router.get('/plat/:idPlat', (req, res) => {
    const ObjectId = require('mongodb').ObjectId; 
    const id = req.params.idPlat;
    console.log("ID------------", id);
    var o_id = new ObjectId(id);
    plat.find({
        _id: o_id
    })
    .then(platFound => {
        if (!platFound){
        return res.status(404).end();
        }
        // console.log(json(platFound));
        return res.status(200).json(platFound)
    })
    .catch(err => console.log(err));
})

/**
 * Persister un plat.
 */
router.post('/addplat', (req, res, next) => {
    let newPlat = new plat({
        name: req.body.name,
        number: req.body.number,
        numberSold: 0,
        numberRemain: req.body.number,
        price: req.body.price,
        idRestaurant: req.body.idRestaurant,
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
router.put('/plat/:idPlat', (req, res, next) => {
    plat.findOneAndUpdate({ _id: req.params.idPlat}, {
            $set: {
                name: req.body.name,
                number: req.body.number,
                numberSold: req.body.numberSold,
                numberRemain: req.body.numberRemain,
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
    plat.deleteOne({_id: req.params.idPlat},
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