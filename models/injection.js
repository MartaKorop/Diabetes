let express = require('express');

module.exports = {
    add: function (req, params, callback) {
      let db = req.db;

      let sql = 'INSERT INTO injection' +
          ' (volume, insulin_id, time, user_id)' +
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
