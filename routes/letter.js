let express = require('express');
let bcrypt = require('bcrypt');
let router = express.Router();
let nodemailer = require("nodemailer");

let config = require('../config');
let Sugar = require('../models/sugar');
let Doctor = require('../models/doctor');


router.get('/', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    Doctor.getListByUser(req, user_id, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('send-letter', {
                title: 'Send a letter to doctor',
                doctors: results,
                session: req.session,
            });
        }
    });
});

router.post('/', config.requireLogin, function (req, res, next) {

    let email = req.body.email;
    let days = req.body.days;
    let user_id = req.session.user.id;
    let doc_params = [user_id, email];

    Doctor.getByEmailAndUser(req, doc_params, function (err, docRes) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            let sugar_params = [user_id, days - 1, user_id, days - 1];
            Sugar.getListWithInj(req, sugar_params, function (err, result) {
                if (err) {
                    res.send("Something went wrong! " + err);
                } else {
                    let resString = '<p>Hello dear ' + docRes.first_name + ' ' + docRes.last_name
                        + '</p><p>User ' + req.session.user.first_name + ' ' + req.session.user.last_name
                        + ' shared his/her glucose logbook by site Diabetes.</p>'
                        + '<p></p>You are receiving this because you (or someone else) have requested to get notification by Diabetes.</p>';

                    resString += '<table ><thead><tr> <th>Date&nbsp;</th> <th>Time&nbsp;</th><th>&nbsp;</th><th>Value&nbsp;</th> <th>Name</th></tr></thead>'
                        + '<tbody>';
                    for (var i = 0; i < result.length; i++) {
                        resString += '<tr>'
                            + '<td>' + result[i].time.getDate().toString() + '.' + (result[i].time.getMonth() + 1).toString() + '.'
                            + result[i].time.getFullYear().toString() + '&nbsp;</td>'
                            + '<td>' + result[i].time.getHours().toString() + ':' + result[i].time.getMinutes() + '&nbsp;</td>'
                            + '<td>' + result[i].type + '&nbsp;</td><td>' + result[i].value + '&nbsp;</td><td>' + result[i].name + '</td></tr>';
                    }
                    resString += '</tbody></table>';
                    let mailOptions = {
                        to: email,
                        from: 'Diabetes',
                        subject: 'Diabetes - Logbook',
                        html: resString,
                    };

                    let smtpTrans = nodemailer.createTransport(config.smtpConfig());
                    smtpTrans.sendMail(mailOptions, function (err) {
                        if (err) {
                            res.send("Something went wrong! " + err);
                        } else {
                            res.redirect('/letter');
                        }
                    });
                }
            });
        }
    });
});


module.exports = router;
