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

});


module.exports = router;