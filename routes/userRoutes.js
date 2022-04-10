const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret";

// Introduire la fonction d'enregistrement des utilisateurs
const {
    userAuth,
    userLogin,
    checkRole,
    userRegister,
    serializeUser
} = require("../utils/Auth");

const user = require('../models/user');
  
// Client Registeration Route
router.post("/register-client", async (req, res) => {
await userRegister(req.body, "client", res);
});

// Restaurant Registration Route
router.post("/register-restaurant", async (req, res) => {
await userRegister(req.body, "restaurant", res);
});

// Deliverer Registration Route
router.post("/register-deliverer", async (req, res) => {
await userRegister(req.body, "deliverer", res);
});

// Ekaly Registration Route
router.post("/register-ekaly", async (req, res) => {
    await userRegister(req.body, "ekaly", res);
    });

// Client Login Route
router.post("/login-client", async (req, res) => {
    await userLogin(req.body, "client", res);
});
  
// Restaurant Login Route
router.post("/login-restaurant", async (req, res) => {
    await userLogin(req.body, "restaurant", res);
});

// Deliverer Login Route
router.post("/login-deliverer", async (req, res) => {
    await userLogin(req.body, "deliverer", res);
});

// Ekaly Login Route
router.post("/login-ekaly", async (req, res) => {
    await userLogin(req.body, "ekaly", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
    return res.json(serializeUser(req.user));
});

// Client Protected Route
router.get(
    "/client-protectd",
    userAuth,
    checkRole(["client","ekaly"]),
    async (req, res) => {
        return res.json("Bonjour Client.");
    }
);

// Restaurant Protected Route
router.get(
    "/restaurant-protectd",
    userAuth,
    checkRole(["restaurant","ekaly"]),
    async (req, res) => {
        return res.json("Bonjour restaurant.");
    }
);

// Deliverere Protected Route
router.get(
    "/deliverer-protectd",
    userAuth,
    checkRole(["deliverer","ekaly"]),
    async (req, res) => {
        return res.json("Bonjour Deliverer");
    }
);

// Ekaly Admin Protected Route
router.get(
    "/ekaly-protectd",
    userAuth,
    checkRole(["ekaly"]),
    async (req, res) => {
        return res.json("Bonjour Ekaly");
    }
);

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
 * Retourner un utilisateur par son ID.
 */
router.get('/users/:idUser', (req, res) => {
    const ObjectId = require('mongodb').ObjectId; 
    const id = req.params.idUser;
    var o_id = new ObjectId(id);
    user.find({
        _id: o_id
    })
    .then(userFound => {
        if (!userFound){
        return res.status(404).end();
        }
        // console.log(json(userFound));
        return res.status(200).json(userFound)
    })
    .catch(err => console.log(err));
})

/**
 * Supprimer un user.
 */
router.delete('/:idUser', (req, res, next) => {
    user.deleteOne({_id: req.params.idUser},
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