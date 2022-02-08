let express = require('express');
let bcrypt = require('bcrypt');
let router = express.Router();
let config = require('../config');

let Insulin = require('../models/insulin');
let Strip = require('../models/strip');
let Sugar = require('../models/sugar');
let Injection = require('../models/injection');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Diabetes',
        session: req.session,
    });
});

router.get('/add', config.requireLogin, function (req, res, next) {
   let user_id = req.session.user.id;

    Strip.getByUserId(req, user_id, function (err, stripRes) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            Insulin.getByUserId(req, user_id, function (err, insulinRes) {
                if (err) {
                    res.send("Something went wrong! " + err);
                } else {
                    res.render('log-edit', {
                        title: 'New log entry',
                        //action: 'add',
                        strip: stripRes,
                        insulin: insulinRes,
                        session: req.session,
                    });
                }
            });
        }
    });
});

router.post('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    let {sugar_level, strip_id, time, short_volume, short_id, long_volume, long_id} = req.body;

    let sugar_value = parseFloat(sugar_level);
    let short_value = parseInt(short_volume);
    let long_value = parseInt(long_volume);

    if (!isNaN(sugar_value ) && sugar_value  > 0) {
        let sugar_params = [sugar_level, strip_id, time, user_id, 0];
        Sugar.add(req, sugar_params, function (err, sugarRes) {
            if (err) {
                res.send("Something went wrong! " + err);
            }
        });
    }
    if (!isNaN(short_value ) && short_value  > 0) {
        let short_params = [short_volume, short_id, time, user_id, 0];
        Injection.add(req, short_params, function (err, shortRes) {
            if (err) {
                res.send("Something went wrong! " + err);
            }
        });
    }
    if (!isNaN(long_value ) && long_value  > 0) {
        let long_params = [long_volume, long_id, time, user_id, 0];
        Injection.add(req, long_params, function (err, shortRes) {
            if (err) {
                res.send("Something went wrong! " + err);
            }
        });
    }
    res.redirect('/log/add');
});

module.exports = router;
