var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

router.get('/', function (req, res, next) {
    res.render('signin', {
        title: 'Sign In',
        query: req.query,
    });
});

router.post('/', function (req, res, next) {
    var session = req.session;

    var {email, password} = req.body;
    let dest = req.body.dest ? req.body.dest : '/';

    User.getByEmail(req, email, function (err, userData) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            if (!userData) {
                res.render('signin', {
                    title: 'Sign In ',
                    message: 'User ' + email + ' not found !',
                    query: req.query,
                });
            } else {
                let passwordCheck = bcrypt.compareSync(password, userData.password);
                if (passwordCheck) {
                    session.user = {
                        email:    userData.email,
                        id:       userData.user_id,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                    };
                    session.user.expires = new Date(Date.now() + 3 * 24 * 3600 * 1000);
                    res.redirect(dest);
                } else {
                    res.render('signin', {
                        title: 'Sign In',
                        message: 'Incorrect password!',
                        query: req.query,
                    });
                }
            }
        }
    });
});

module.exports = router;
