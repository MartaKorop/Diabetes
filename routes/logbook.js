var express = require('express');
var router = express.Router();
var config = require('../config');

var Sugar = require('../models/sugar');

router.get('/', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = 0;

    let params = [user_id, days, user_id, days];

    Sugar.getListWithInj(req, params, function (err, results) {
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
                        'value': results[i].value,
                        'type': results[i].type,
                        'name': results[i].name,
                    });
                    prev_date = date;
                    prev_time = time;
                } else {
                    if (prev_time !== time) {
                        res_array.push({
                            'time': time,
                            'value': results[i].value,
                            'type': results[i].type,
                            'name': results[i].name,
                        });
                        prev_time = time;
                    } else {
                        res_array.push({
                            'value': results[i].value,
                            'type': results[i].type,
                            'name': results[i].name,
                        });
                    }
                }
            }
            res.render('logbook', {
                title: 'Today logbook',
                result: res_array,
                session: req.session,
            });
        }
    });
});


router.get('/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = req.params.path;

    let params = [user_id, days - 1, user_id, days - 1];

    Sugar.getListWithInj(req, params, function (err, results) {
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
                        'value': results[i].value,
                        'type': results[i].type,
                        'name': results[i].name,
                    });
                    prev_date = date;
                    prev_time = time;
                } else {
                    if (prev_time !== time) {
                        res_array.push({
                            'time': time,
                            'value': results[i].value,
                            'type': results[i].type,
                            'name': results[i].name,
                        });
                        prev_time = time;
                    } else {
                        res_array.push({
                            'value': results[i].value,
                            'type': results[i].type,
                            'name': results[i].name,
                        });
                    }
                }
            }
            res.render('logbook', {
                title: 'Logbook by ' + (days) + ' days',
                result: res_array,
                session: req.session,
            });
        }
    });
});
module.exports = router;
