var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var User = require('../models/user');

var config = require('../config');

router.get('/', function (req, res, next) {
    res.render('signup', {
        title: 'Sign Up',
    });
});

router.post('/', function (req, res, next) {
    var {first_name, last_name, email, password, confirmPassword} = req.body;
    var session = req.session;


    if(password !== confirmPassword) {
        res.render('signup', {
            title: 'Sign Up',
            message: 'Incorrect confirm password!',
        });
    } else {
        if (email !== '' && config.validateEmail(email)) {
            User.getByEmail(req, email, function (err, user_results) {
                if (err) {
                   res.send("Something went wrong! " + err);
                } else {
                    if (user_results){
                        res.render('signup', {
                            title: 'Sign Up',
                            message: 'User with such email exist already!',
                        });
                    } else {
                        var password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
                        var userData = [
                            first_name,
                            last_name,
                            email,
                            password_hash
                            ];
                        User.create(req, userData, function (err, results) {
                            if (err) {
                                res.send("Something went wrong! " + err);
                            } else {
                                User.getByEmail(req, email, function (err, id_result) {
                                    if (err) {
                                        res.send("Something went wrong! " + err);
                                    } else {
                                        session.user = {
                                            email:    id_result.email,
                                            id:       id_result.user_id,
                                        };
                                        session.user.expires = new Date(Date.now() + 3 * 24 * 3600 * 1000);
                                        res.redirect('/');
                                    }
                                });
                            }
                        });
                    }
                }
            });
        } else {
            res.render('signup', {
                title: 'Sign Up',
                message: 'You have entered an invalid email address!',
            });
        }
    }
});

module.exports = router;
