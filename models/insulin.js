let express = require('express');

module.exports = {

    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO insulin'+
            ' (name, type, volume, is_active, user_id)' +
            ' VALUES (?, ?, ?, ?, ?)';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getByUserId: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM insulin WHERE user_id = ? AND is_active = 1 ORDER BY type DESC';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getById: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM insulin WHERE insulin_id = ? AND user_id = ?';
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

        let sql = 'UPDATE insulin'+
            ' SET name = ?, type = ?, volume = ?'+
            ' WHERE insulin_id = ?';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};
