var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var config = require('../config');
var Doctor = require('../models/doctor');

router.get('/add', config.requireLogin, function (req, res, next) {
    res.render('doctor-edit', {
        title: 'Add information about doctor',
        action: 'add',
        session: req.session,
    });
});


router.post('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {first_name, last_name, email, phone} = req.body;

    let params = [first_name, last_name, email, phone, user_id];
    Doctor.add(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});

module.exports = router;