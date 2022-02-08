var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var config = require('../config');

var User = require('../models/user');
var Weight = require('../models/weight');

router.get('/', config.requireLogin, function (req, res, next) {

});

router.get('/add', config.requireLogin, function (req, res, next) {
    res.render('weight-edit', {
        title: 'New weight entry',
        action: 'add',
        session: req.session,
    });

});

router.post('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {weight, time} = req.body;
    let params = [weight, time, user_id];

    Weight.add(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/weight/add');
        }
    });
});

router.get('/results', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = 365;
    let params = [user_id, days];

    Weight.getList(req, params, function (err, results) {
        res.render('results-weight', {
            title: 'Weight results',
            result: results,
            session: req.session,
        });
    });
});
module.exports = router;
