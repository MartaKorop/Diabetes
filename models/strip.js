let express = require('express');

module.exports = {

    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO strip'+
            ' (device_name, name, amount, is_active, user_id)' +
            ' VALUES (?, ?, ?, ?, ?)';
        db.query(sql, params, function (err, results) {
            if (err) {
                callbback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getByUserId: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM strip WHERE user_id = ? AND is_active = 1';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    getById: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM strip WHERE strip_id = ? AND user_id = ?';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    update: function (req, params, callback) {
        let db = req.db;

        let sql = 'UPDATE strip'+
            ' SET device_name = ?, name = ?, amount = ?'+
            ' WHERE strip_id = ?';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    delete: function (req, params, callback) {
        let db = req.db;

        let sql = 'DELETE FROM strip WHERE strip_id = ?';
        db.query(sql, params, function(err, results, fields){
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};
