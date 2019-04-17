let express = require('express');

/*
CREATE TABLE diabet.insulin (
  insulin_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL,
  type VARCHAR(32) NOT NULL,
  volume INT(11) NOT NULL,
  user_id INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (insulin_id)
) */

module.exports = {

    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO insulin'+
            ' (name, type, volume, user_id)' +
            ' VALUES (?, ?, ?, ?)';
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

        let sql = 'SELECT * FROM insulin WHERE user_id = ? ORDER BY type DESC';
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

        let sql = 'SELECT * FROM insulin WHERE insulin_id = ?';
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