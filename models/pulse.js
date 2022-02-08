let express = require('express');

module.exports = {
    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO pulse' +
            ' (value, time, user_id)' +
            ' VALUES (?, ?, ?)';
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

        let sql = 'SELECT value, time FROM pulse ' +
            ' WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY' +
            ' ORDER BY time DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};
