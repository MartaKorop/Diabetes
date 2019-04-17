var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var config = require('../config');

var User = require('../models/user');
var Glycated = require('../models/glycated');

router.get('/', config.requireLogin, function (req, res, next) {
    res.render('glycated', {
        title: 'Diabetes',
        session: req.session,
    });
});

router.get('/add', config.requireLogin, function (req, res, next) {
    res.render('glycated-edit', {
        title: 'Add new glycated hb',
        action: 'add',
        session: req.session,
    });

});

router.post('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {value, time} = req.body;

    let params = [value, time, user_id];

    Glycated.add(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});

module.exports = router;