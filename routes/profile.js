var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var config = require('../config');
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

    let {first_name, last_name, phone, birthday, gender} = req.body;
    let userData = [
        first_name,
        last_name,
        phone,
        birthday,
        gender,
        user_id,
    ];
    User.updateGeneral(req, userData, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});

router.post('/detail/edit', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {diabetes_type, diagnosed, blood_group, rh, height} = req.body;
    let userData = [
        height,
        diabetes_type,
        blood_group,
        rh,
        diagnosed,
        user_id
    ];
    User.update(req, userData, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});

router.get('/insulin/add', config.requireLogin, function (req, res, next) {
    res.render('insulin-edit', {
        title: 'Add new insulin',
        action: 'add',
        session: req.session,
    });
});

router.post('/insulin/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {name, type, volume } = req.body;

    let params = [name, type, volume, 1, user_id,];

    Insulin.add(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});

router.get('/insulin/edit/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let insulin_id = req.params.path;

    let params = [insulin_id, user_id];

    Insulin.getById(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('insulin-edit', {
                title: 'Edit insulin ' + results.name,
                action: 'edit',
                insulin: results,
                session: req.session,
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

router.get('/strip/add', config.requireLogin, function (req, res, next) {
    res.render('strip-edit', {
        title: 'Add new strip',
        action: 'add',
        session: req.session,
    });
});

router.post('/strip/add', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let {device_name, name, amount} = req.body;

    let params = [device_name, name, amount, 1, user_id,];

    Strip.add(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});

router.get('/strip/edit/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let strip_id = req.params.path;

    let params = [strip_id, user_id];

    Strip.getById(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('strip-edit', {
                title: 'Edit strip ' + results.name,
                action: 'edit',
                strip: results,
                session: req.session,
            });
        }
    });
});

router.post('/strip/edit/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let strip_id = req.params.path;

    let {device_name, name, amount} = req.body;
    let params = [device_name, name, amount, strip_id];

    Strip.update(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.redirect('/profile');
        }
    });
});

module.exports = router;
