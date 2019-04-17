let express = require('express');
/*
CREATE TABLE diabet.glycated_hb (
  glycated_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  value DECIMAL(10, 0) NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT(11) UNSIGNED NOT NULL,
 */
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
};