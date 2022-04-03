const express = require('express');
const router = express.Router();

const user = require('../models/user');

/**
 * Retourner la liste des user.
 */
 router.get('/users', (req, res) => {
    user.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ users: items })
    });

    console.log('User Ok !!');
    
});

/**
 * Persister un user.
 */
router.post('/adduser', (req, res, next) => {
    let newUser = new user({
        idUser: req.body.idUser,
        name: req.body.name,
        address: req.body.address,
        tel: req.body.tel
    });
    console.log(req.body);

    newUser.save((err, user) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "User insere avec succes."});
        }
    });
});

/**
 * Mettre à jour un user.
 */
router.put('/updateuser/:idUser', (req, res, next) => {
    user.findOneAndUpdate({ idUser: req.params.idUser}, {
            $set: {
                name: req.body.name,
                address: req.body.address,
                tel: req.body.tel
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({msg: "User mis à jour avec succes."});
            }
        }
    );
});


/**
 * Supprimer un user.
 */
router.delete('/user/:idUser', (req, res, next) => {
    user.deleteOne({idUser: req.params.idUser},
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