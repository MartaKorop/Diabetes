let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let nodemailer = require("nodemailer");

let config = require('../config');
let User = require('../models/user');

router.get('/', function(req, res) {
    res.render('forgot-password', {
        title: 'Forgot password',
    });
});

router.post('/', function(req, res) {
    let email = req.body.email;

    if (email !== '' && config.validateEmail(email)) {
        User.getByEmail(req, email, function (err, userData) {
            if (err) {
                res.send("Something went wrong! " + err);
            } else {
                if (!userData) {
                    res.render('forgot-password', {
                        title: 'Forgot password',
                        message: 'User ' + email + ' not found !',
                    });
                } else {
                    let token = crypto.createHash('md5').update(email).digest("hex");
                    let params = [token, email];
                    User.updateForgotPassword(req, params);

                    let mailOptions = {
                        to: userData.email,
                        from: 'Diabetes',
                        subject: 'Diabetes - Password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://' + req.headers.host + '/reset-password/' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };

                    let smtpTrans = nodemailer.createTransport(config.smtpConfig());
                    smtpTrans.sendMail(mailOptions, function(err) {
                        if (err) {
                            res.send("Something went wrong! " + err);
                        } else {
                            res.render('forgot-password', {
                                title: 'Forgot password',
                                message: 'An e-mail has been sent to ' + userData.email + ' with further instructions.'
                            });
                        }
                    });
                }
            }
        });
    } else {
        res.render('forgot-password', {
            title: 'Forgot password',
            message: 'You have entered an invalid email address!',
        });
    }
});

module.exports = router;
