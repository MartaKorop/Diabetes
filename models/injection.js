/*
CREATE TABLE diabet.injection (
  injection_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  volume INT(11) NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  insulin_id INT(11) UNSIGNED NOT NULL,
  user_id INT(11) UNSIGNED NOT NULL,
  is_new TINYINT(1) NOT NULL DEFAULT 0,
 */
let express = require('express');

module.exports = {
    add: function (req, params, callback) {
      let db = req.db;

      let sql = 'INSERT INTO injection' +
          ' (volume, insulin_id, time, user_id, is_new)' +
          ' VALUES (?, ?, ?, ?, ?)';
      db.query(sql, params, function (err, results) {
          if (err) {
              callback(err, null);
          } else {
              callback(null, results);
          }
      })
    },

    getByUserId: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM injection WHERE user_id = ? ORDER BY time';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};