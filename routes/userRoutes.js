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
    userRegisterbyRole,
    userUpdate,
    serializeUser
} = require("../utils/Auth");

const user = require('../models/user');

// Registeration Route for everyone
router.post("/register", async (req, res) => {
    await userRegister(req.body, res);
    });
  
// Client Registeration Route
router.post("/register-client", async (req, res) => {
await userRegisterbyRole(req.body, "client", res);
});

// Restaurant Registration Route
router.post("/register-restaurant", async (req, res) => {
await userRegisterbyRole(req.body, "restaurant", res);
});

// Deliverer Registration Route
router.post("/register-deliverer", async (req, res) => {
await userRegisterbyRole(req.body, "deliverer", res);
});

// Ekaly Registration Route
router.post("/register-ekaly", async (req, res) => {
    await userRegisterbyRole(req.body, "ekaly", res);
    });

// Client Login Route
router.post("/login", async (req, res) => {
    await userLogin(req.body, res);
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
    console.log("ID------------", id);
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
router.delete('/users/:idUser', (req, res, next) => {
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

router.put('/users/:idUser', async (req, res) => {
    
    await userUpdate(req.params.idUser, req.body, res);

    // user.findOneAndUpdate({ _id: req.params.idUser}, {
    //         $set: {
    //             name: req.body.name,
    //             username: req.body.username,
    //             email: req.body.email,
    //             adress: req.body.adress,
    //             password: req.body.password
    //         }
    //     },
    //     function (err, result) {
    //         if (err) {
    //             res.json(err);
    //         } else {
    //             res.json({msg: "Utilisateur mis à jour avec succes."});
    //         }
    //     }
    // );
});

module.exports = router;