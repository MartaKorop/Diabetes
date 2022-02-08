let express = require('express');

module.exports = {
    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO doctor' +
            ' (first_name, last_name, email, phone, user_id)' +
            ' VALUES (?, ?, ?, ?, ?)';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getByEmailAndUser: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM doctor WHERE user_id = ? AND email = ?';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    getListByUser: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM doctor WHERE user_id = ?';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};
