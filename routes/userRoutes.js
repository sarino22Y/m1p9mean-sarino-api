const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret";

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
router.post('/register', (req, res, next) => {
    let newUser = new user({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        adress: req.body.adress,
        password: user.hashPassword(req.body.password),
        creationDate: Date.now()
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
 * login user.
 */
router.post('/login', 
    async function(req, res, next) {
        const {username, password} = req.body;
        const userawait = await  user.findOne({username: 'sarino'}).lean();
        if (!userawait) {
            return res.json({status: 'error', error: "Invalid username/password"});
        }
        if (await  bcrypt.compare(password, userawait.password)) {
            const token = jwt.sign({
                id: userawait._id,
                username: userawait.username
            },
            JWT_SECRET
            )
            return res.json({status: 'Ok', jwtToken: token});
        }
        return res.json({status: 'error', error: "Invalid email/password"});
    }
);

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