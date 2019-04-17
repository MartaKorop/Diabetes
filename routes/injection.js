var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var config = require('../config');

var User = require('../models/user');
var Insulin = require('../models/insulin');
var Strip = require('../models/strip');
var Injection = require('../models/injection');

router.get('/', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    Injection.getByUserId(req, user_id, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('injection', {
                title: 'Sugar',
                sugar: results,
                session: req.session,
            });
        }
    });
});

router.get('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    Insulin.getByUserId(req, user_id, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('injection-edit', {
                title: 'Add new injection',
                action: 'add',
                insulin: results,
                session: req.session,
            });
        }
    });
});

router.post('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {volume, insulin_id, time } = req.body;

    //is_new = is_new === 'on' ? 1 : 0;

    let params = [volume, insulin_id, time, user_id, 0 ];
    Injection.add(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});
module.exports = router;