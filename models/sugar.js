let express = require('express');

/*
CREATE TABLE diabet.sugar (
  sugar_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  sugar_level DECIMAL(10, 0) NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT(11) UNSIGNED NOT NULL,
  is_new TINYINT(1) NOT NULL,
  strip_id INT(11) UNSIGNED NOT NULL, */
module.exports = {
    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO sugar' +
            ' (sugar_level, strip_id, time, user_id, is_new)'+
            ' VALUES (?, ?, ?, ?, ?)';
        db.query(sql, params, function (err, results) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getListByUserId: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT sugar.*, strip.name FROM sugar ' +
            ' INNER JOIN strip ON sugar.strip_id = strip.strip_id' +
            ' WHERE sugar.user_id = ? ORDER BY time DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

};