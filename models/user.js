let express = require('express');

/*
CREATE TABLE diabet.user (
  user_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(32) NOT NULL,
  last_name VARCHAR(32) NOT NULL,
  email VARCHAR(64) NOT NULL,
  phone VARCHAR(13) NOT NULL,
  birthday TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  password VARCHAR(64) NOT NULL,
  height DECIMAL(10, 0) DEFAULT NULL,
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
)*/

module.exports = {
  
    create: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO user' +
            ' (first_name, last_name, email, password)'+
            ' VALUES (?, ?, ?, ?)';
        db.query(sql, params, function (err, results) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getById: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM user WHERE user_id = ?';
        db.query(sql, params, function (err, results) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    getByEmail: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM user WHERE email = ?';
        db.query(sql, params, function (err, results) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    update: function (req, params, callback) {
        let db = req.db;

        let sql = 'UPDATE user' +
            ' SET first_name = ?, last_name = ?, phone = ?, birthday = ?, height = ?, update_at = NOW()' +
            ' WHERE user_id = ?';
        db.query(sql, params, function (err, results) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    updateForgotPassword: function(req, params, callback){//callback
        let db = req.db;

        let sql = 'UPDATE user SET reset_expired = DATE_ADD(now(), INTERVAL 1 HOUR), reset_token = ? WHERE email = ?';
        db.query(sql, params, function (err, results) {
           return results;
        });
    },

    updatePassword: function (req, params, callback) {
        let db = req.db;

        let sql = 'UPDATE user'+
            ' SET password = ?, reset_token = null, reset_expired = null'+
            ' WHERE reset_token = ? AND reset_expired > NOW()';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};