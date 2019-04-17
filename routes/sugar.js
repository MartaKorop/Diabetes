var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var config = require('../config');

var User = require('../models/user');
var Insulin = require('../models/insulin');
var Strip = require('../models/strip');
var Sugar = require('../models/sugar');

router.get('/', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    Sugar.getListByUserId(req, user_id, function (err, results) {
       if (err) {
           res.send("Something went wrong! " + err);
       } else {
           res.render('sugar', {
               title: 'Sugar',
               sugar: results,
               session: req.session,
           });
       }
    });
});

router.get('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    Strip.getByUserId(req, user_id, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('sugar-edit', {
                title: 'Add new sugar level',
                action: 'add',
                strip: results,
                session: req.session,
            });
        }
    });
});

router.post('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {sugar_level, time, strip_id } = req.body;

    //is_new = is_new === 'on' ? 1 : 0;

    let params = [sugar_level, strip_id, time, user_id, 0 ];
    Sugar.add(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});

module.exports = router;