let express = require('express');

module.exports = {
    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO pressure' +
            ' (systolic, diastolic, time, user_id)' +
            ' VALUES (?, ?, ?, ?)';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getListWithPulse: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT p.value AS "value_p", "" AS "value_s", "" AS "value_d", time' +
            ' FROM pulse p WHERE user_id = ? UNION ALL' +
            ' SELECT "" AS "value_p", p.systolic AS "value_s", p.diastolic AS "value_d", time' +
            ' FROM pressure p WHERE user_id = ?' +
            ' ORDER BY time DESC';
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

        let sql = 'SELECT systolic, diastolic, time FROM pressure ' +
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
