var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var config = require('../config');

var User = require('../models/user');
var Pressure = require('../models/pressure');
var Pulse = require('../models/pulse');


router.get('/', config.requireLogin, function (req, res, next) {
    res.render('pressure', {
        title: 'Diabetes',
        session: req.session,
    });
});

router.get('/add', config.requireLogin, function (req, res, next) {
    res.render('pressure-edit', {
        title: 'New pressure/pulse entry',
        action: 'add',
        session: req.session,
    });

});

router.post('/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {systolic, diastolic, pulse, time} = req.body;

    let systolic_value = parseInt(systolic);
    let diastolic_value = parseInt(diastolic);
    let pulse_value = parseInt(pulse);

    if ((!isNaN(systolic_value) && systolic_value > 0) && (!isNaN(diastolic_value) && diastolic_value > 0)) {
        let pressure_params = [systolic, diastolic, time, user_id];
        Pressure.add(req, pressure_params, function (err, pressureRes) {
            if (err) {
                res.send("Something went wrong! " + err);
            }
        });
    }
    if (!isNaN(pulse_value) && pulse_value > 0) {
        let pulse_params = [pulse, time, user_id];
        Pulse.add(req, pulse_params, function (err, pulseRes) {
            if (err) {
                res.send("Something went wrong! " + err);
            }
        });
    }
    res.redirect('/pressure/add');
});


router.get('/results', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let params = [user_id, user_id];

    Pressure.getListWithPulse(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            let res_array = [];
            var prev_date = '';
            var prev_time = '';
            for (var i = 0; i < results.length; i++) {
                var date = results[i].time.getDate().toString() + '.' + (results[i].time.getMonth() + 1).toString() + '.' + results[i].time.getFullYear().toString();
                var time = results[i].time.getHours().toString() + ':' + results[i].time.getMinutes().toString();
                if (prev_date !== date) {
                    res_array.push({
                        'date': date,
                        'time': time,
                        'value_p': results[i].value_p,
                        'value_s': results[i].value_s,
                        'value_d': results[i].value_d,
                    });
                    prev_date = date;
                    prev_time = time;
                } else {
                    if (prev_time !== time) {
                        res_array.push({
                            'time': time,
                            'value_p': results[i].value_p,
                            'value_s': results[i].value_s,
                            'value_d': results[i].value_d,
                        });
                        prev_time = time;
                    } else {
                        res_array.push({
                            'value_p': results[i].value_p,
                            'value_s': results[i].value_s,
                            'value_d': results[i].value_d,
                        });
                    }
                }
            }
            res.render('results-pressure', {
                title: 'Pressure and pulse results',
                result: res_array,
                session: req.session,
            });
        }
    });
});
module.exports = router;
