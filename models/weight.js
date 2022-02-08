let express = require('express');

module.exports = {
    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO weight' +
            ' (weight, time, user_id) VALUES (?, ?, ?)';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getList: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM weight w WHERE w.user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY' +
            ' ORDER BY time DESC, weight_id';

        db.query(sql, params, callback, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getListAll: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM weight w WHERE w.user_id = ?' +
            ' ORDER BY time DESC, weight_id';

        db.query(sql, params, callback, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};
