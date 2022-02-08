let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');

let User = require('../models/user');

router.get('/:token', function(req, res, next) {
    res.render('reset-password', {
        title: 'Reset password',
        token : req.params.token,
    });
});

router.post('/:token', function(req, res, next) {
    let token = req.params.token;
    let {password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
        res.render('reset-password', {
            title: 'Reset password',
            message: 'Incorrect confirm password!',
            token : req.params.token,
        });
    } else {
        let password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        let params = [password_hash, token];

        User.updatePassword(req, params, function(err, results) {
            if (err) {
                res.send("Something went wrong! " + err);
            } else {
                if (results.changedRows) {
                    res.redirect('/signin');
                } else {
                    res.render('reset-password', {
                        title: 'Reset password',
                        token : token,
                        message : 'Token not found!'
                    });
                }
            }
        });
    }
});

module.exports = router;
