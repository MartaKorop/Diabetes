var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var User = require('../models/user');
var Insulin = require('../models/insulin');
var Strip = require('../models/strip');

router.get('/', config.requireLogin, function (req, res, next) {
   let user_id = req.session.user.id;

   User.getById(req, user_id, function (err, results) {
      if (err) {
          res.send("Something went wrong! " + err);
      } else {
          Insulin.getByUserId(req, user_id, function (err, insulinResults) {
              if (err) {
                  res.send("Something went wrong! " + err);
              } else {
                  Strip.getByUserId(req, user_id, function (err, stripResults) {
                      if (err) {
                          res.send("Something went wrong! " + err);
                      } else {
                          res.render('profile', {
                              title: 'My profile',
                              user: results,
                              insulin: insulinResults,
                              strips: stripResults,
                              session: req.session,
                          });
                      }
                  });
              }
          });
      }
   });
});

router.post('/edit', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    let {first_name, last_name, phone, birthday, height} = req.body;
    let userData = [
        first_name,
        last_name,
        phone,
        birthday,
        height,
        user_id,
    ];
    User.update(req, userData, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });

    router.get('/insulin/add', config.requireLogin, function (req, res, next) {
        res.render('insulin-edit', {
            title: 'Add new insulin',
            action: 'add',
        });
    });

    router.post('/insulin/add', config.requireLogin, function (req, res, next) {
        let user_id = req.session.user.id;
        let {name, type, volume } = req.body;

        let params = [name, type, volume, user_id,];

        Insulin.add(req, params, function (err, results) {
            if (err) {
                res.send("Something went wrong! " + err);
            } else {
                res.redirect('/profile');
            }
        });
    });

    router.get('/insulin/edit/:path', config.requireLogin, function (req, res, next) {
        let insulin_id = req.params.path;

        Insulin.getById(req, insulin_id, function (err, results) {
            if (err) {
                res.send("Something went wrong! " + err);
            } else {
                res.render('insulin-edit', {
                    title: 'Edit insulin ' + results.name,
                    action: 'edit',
                    insulin: results,
                });
            }
        });

    });

    router.post('/insulin/edit/:path', config.requireLogin, function (req, res, next) {
        let user_id = req.session.user.id;
        let insulin_id = req.params.path;

        let {name, type, volume} = req.body;
        let params = [name, type, volume, insulin_id];

        Insulin.update(req, params, function (err, results) {
            if (err) {
                res.send("Something went wrong! " + err);
            } else {
                res.redirect('/profile');
            }
        });
    });

});


module.exports = router;