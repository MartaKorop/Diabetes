let express = require('express');

/*
CREATE TABLE diabet.strip (
  strip_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  device_name VARCHAR(32) DEFAULT NULL,
  name VARCHAR(32) NOT NULL,
  amount INT(11) NOT NULL,
  user_id INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (strip_id)
) */

module.exports = {

    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO strip'+
            ' (device_name, name, amount, user_id)' +
            ' VALUES (?, ?, ?, ?)';
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

        let sql = 'SELECT * FROM strip WHERE user_id = ?';
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

        let sql = 'SELECT * FROM strip WHERE strip_id = ?';
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