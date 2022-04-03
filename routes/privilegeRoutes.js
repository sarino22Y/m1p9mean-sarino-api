const express = require('express');
const router = express.Router();

const privilege = require('../models/privilege');

/**
 * Retourner la liste des privilege.
 */
 router.get('/privileges', (req, res) => {
    privilege.find((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ privileges: items })
    });

    console.log('Privilege Ok !!');
    
});

/**
 * Persister un privilege.
 */
router.post('/addprivilege', (req, res, next) => {
    let newPrivilege = new privilege({
        idPrivilege: req.body.idPrivilege,
        name: req.body.name
    });
    console.log(req.body);

    newPrivilege.save((err, privilege) =>{
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "Privilege insere avec succes."});
        }
    });
});

/**
 * Mettre à jour un privilege.
 */
router.put('/updateprivilege/:idPrivilege', (req, res, next) => {
    privilege.findOneAndUpdate({ idPrivilege: req.params.idPrivilege}, {
            $set: {
                name: req.body.name
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({msg: "Privilege mis à jour avec succes."});
            }
        }
    );
});


/**
 * Supprimer un privilege.
 */
router.delete('/privilege/:idPrivilege', (req, res, next) => {
    privilege.deleteOne({idPrivilege: req.params.idPrivilege},
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