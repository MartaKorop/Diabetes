let express = require('express');

module.exports = {
    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO glycated_hb' +
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

        let sql = 'SELECT * FROM glycated_hb WHERE user_id = ? ORDER BY time DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};
