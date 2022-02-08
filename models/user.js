let express = require('express');

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

    updateGeneral: function (req, params, callback) {
        let db = req.db;

        let sql = 'UPDATE user' +
            ' SET first_name = ?, last_name = ?, phone = ?, birthday = ?, gender = ?, update_at = NOW()' +
            ' WHERE user_id = ?';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    update: function (req, params, callback) {
        let db = req.db;

        let sql = 'UPDATE user' +
            ' SET height = ?, diabetes_type = ?, blood_group = ?, rh = ?, diagnosed = ?, update_at = NOW()' +
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
