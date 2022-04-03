const express = require('express');
const router = express.Router();

const restaurant = require('../models/restaurant');

/**
 * Retourner la liste des restaurant.
 */
 router.get('/restaurants', (req, res) => {
    restaurant.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ restaurants: items })
    });

    console.log('Restaurant Ok !!');
    
});

/**
 * Persister un restaurant.
 */
router.post('/addrestaurant', (req, res, next) => {
    let newRestaurant = new restaurant({
        idRestaurant: req.body.idRestaurant,
        name: req.body.name,
        addres: req.body.addres,
        tel: req.body.tel
    });
    console.log(req.body);

    newRestaurant.save((err, restaurant) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "Restaurant insere avec succes."});
        }
    });
});

/**
 * Mettre à jour un restaurant.
 */
router.put('/updaterestaurant/:idRestaurant', (req, res, next) => {
    restaurant.findOneAndUpdate({ idRestaurant: req.params.idRestaurant}, {
            $set: {
                name: req.body.name,
                addres: req.body.addres,
                tel: req.body.tel
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({msg: "Restaurant mis à jour avec succes."});
            }
        }
    );
});


/**
 * Supprimer un restaurant.
 */
router.delete('/restaurant/:idRestaurant', (req, res, next) => {
    restaurant.deleteOne({idRestaurant: req.params.idRestaurant},
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