const express = require('express');
const router = express.Router();

const assUserPrivilege = require('../models/assUserPrivilege');

/**
 * Retourner la liste des assUserPrivilege.
 */
 router.get('/assUserPrivileges', (req, res) => {
    assUserPrivilege.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ assUserPrivileges: items })
    });

    console.log('AssUserPrivilege Ok !!');
    
});

/**
 * Persister un assUserPrivilege.
 */
router.post('/addassuserprivilege', (req, res, next) => {
    let newAssUserPrivilege = new assUserPrivilege({
        idAssUserPrivilege: req.body.idAssUserPrivilege,
        idUser: req.body.idUser,
        idPrivilege: req.body.idPrivilege
        
    });
    console.log(req.body);

    newAssUserPrivilege.save((err, assUserPrivilege) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "AssUserPrivilege insere avec succes."});
        }
    });
});

/**
 * Mettre à jour un assUserPrivilege.
 */
router.put('/updateassUserPrivilege/:idAssUserPrivilege', (req, res, next) => {
    assUserPrivilege.findOneAndUpdate({ idAssUserPrivilege: req.params.idAssUserPrivilege}, {
            $set: {
                idUser: req.body.idUser,
                idPrivilege: req.body.idPrivilege
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({msg: "AssUserPrivilege mis à jour avec succes."});
            }
        }
    );
});


/**
 * Supprimer un assUserPrivilege.
 */
router.delete('/assUserPrivilege/:idAssUserPrivilege', (req, res, next) => {
    assUserPrivilege.deleteOne({idAssUserPrivilege: req.params.idAssUserPrivilege},
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