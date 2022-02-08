var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var config = require('../config');

var User = require('../models/user');
var Sugar = require('../models/sugar');
var Pulse = require('../models/pulse');
var Weight = require('../models/weight');
var Glycated = require('../models/glycated');
var Pressure = require('../models/pressure');


router.get('/sugar/line', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = 0;
    let params = [user_id, days];
    Sugar.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-sugar-line', {
                title: 'Sugar statistic by today',
                sugar: results,
                session: req.session,
            });
        }
    });
});

router.get('/sugar/line/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = req.params.path;
    let params = [user_id, days - 1];

    Sugar.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-sugar-line', {
                title: 'Sugar statistic by ' + (days) + ' days',
                sugar: results,
                session: req.session,
            });
        }
    });
});


router.get('/sugar/doughnut', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = 0;
    let params = [user_id, days];
    Sugar.getCountOfTargets(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-sugar-doughnut', {
                title: 'Distribution by today',
                result: results,
                session: req.session,
            });
        }
    });
});

router.get('/sugar/doughnut/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = req.params.path;
    let params = [user_id, days - 1];

    Sugar.getCountOfTargets(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-sugar-doughnut', {
                title: 'Distribution by ' + (days) + ' days',
                result: results,
                session: req.session,
            });
        }
    });
});

router.get('/sugar/data', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = 0;
    let params = [user_id, days, days];

    Sugar.getMin(req, params, function (err, minResults) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            Sugar.getMax(req, params, function (err, maxResults) {
                if (err) {
                    res.send("Something went wrong! " + err);
                } else {
                    Sugar.getAverage(req, params, function (err, avResults) {
                        if (err) {
                            res.send("Something went wrong! " + err);
                        } else {
                            res.render('statistic-sugar', {
                                title: 'Statistic by today',
                                min: minResults,
                                max: maxResults,
                                avg: avResults,
                                session: req.session,
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get('/sugar/data/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = req.params.path;
    let params = [user_id, days - 1, days - 1];

    Sugar.getMin(req, params, function (err, minResults) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            Sugar.getMax(req, params, function (err, maxResults) {
                if (err) {
                    res.send("Something went wrong! " + err);
                } else {
                    Sugar.getAverage(req, params, function (err, avResults) {
                        if (err) {
                            res.send("Something went wrong! " + err);
                        } else {
                            res.render('statistic-sugar', {
                                title: 'Statistic by ' + (days) + ' days',
                                min: minResults,
                                max: maxResults,
                                avg: avResults,
                                session: req.session,
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get('/pulse/line', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    let days = 0;
    let params = [user_id, days];

    Pulse.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-pulse-line', {
                title: 'Pulse statistic by today',
                pulse: results,
                session: req.session,
            });
        }
    });
});

router.get('/pulse/line/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    let days = req.params.path;
    let params = [user_id, days - 1];

    Pulse.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-pulse-line', {
                title: 'Pulse statistic by ' + (days) + ' days',
                pulse: results,
                session: req.session,
            });
        }
    });
});

router.get('/weight/line', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    let days = 0;
    let params = [user_id, days];

    Weight.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-weight-line', {
                title: 'Weight statistic by today',
                weight: results,
                session: req.session,
            });
        }
    });
});

router.get('/weight/line/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = req.params.path;
    let params = [user_id, days - 1];

    Weight.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-weight-line', {
                title: 'Weight statistic by ' + (days) + ' days',
                weight: results,
                session: req.session,
            });
        }
    });
});

router.get('/glycated/column', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = 0;
    let params = [user_id, days];

    Glycated.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-glycated-column', {
                title: 'Glycated statistic',
                glycated: results,
                session: req.session,
            });
        }
    });
});

router.get('/pressure/line', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;

    let days = 0;
    let params = [user_id, days];
    Pressure.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-pressure-line', {
                title: 'Pressure statistic by today',
                pressure: results,
                session: req.session,
            });
        }
    });
});

router.get('/pressure/line/:path', config.requireLogin, function (req, res, next) {
    let user_id = req.session.user.id;
    let days = req.params.path;
    let params = [user_id, days - 1];

    Pressure.getList(req, params, function (err, results) {
        if (err) {
            res.send("Something went wrong! " + err);
        } else {
            res.render('graph-pressure-line', {
                title: 'Pressure statistic by ' + (days) + ' days',
                pressure: results,
                session: req.session,
            });
        }
    });
});
module.exports = router;
