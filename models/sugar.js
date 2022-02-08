let express = require('express');
let async = require('async');

module.exports = {
    add: function (req, params, callback) {
        let db = req.db;

        let sql = 'INSERT INTO sugar' +
            ' (sugar_level, strip_id, time, user_id)' +
            ' VALUES (?, ?, ?, ?)';
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
            ' WHERE sugar.user_id = ? ' +
            ' ORDER BY time DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },


    getList: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT sugar_level, time FROM sugar ' +
            ' WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY' +
            ' ORDER BY time DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getListAll: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT sugar_level, time FROM sugar ' +
            ' WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 89 DAY' +
            ' ORDER BY time DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },


    getListWithInj: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT (SELECT s.name FROM strip s' +
            ' INNER JOIN sugar s1 ON s.strip_id = s1.strip_id' +
            ' WHERE s1.sugar_id = sugar.sugar_id) AS name,' +
            ' sugar_level AS value, time, "glucose" as type' +
            ' FROM sugar WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY' +
            ' UNION ALL SELECT' +
            ' (SELECT i.name FROM insulin i' +
            ' INNER JOIN injection i1 ON i.insulin_id = i1.insulin_id' +
            ' WHERE i1.injection_id = injection.injection_id) AS name,' +
            ' volume AS value, time, "injection" as type' +
            ' FROM injection WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY' +
            ' ORDER BY time DESC, type DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getCountOfTargets: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT count(*) AS target_range,' +
            ' SUM(CASE WHEN sugar_level <= 3.9 THEN 1 ELSE 0 END) AS hypo,' +
            ' SUM(CASE WHEN sugar_level > 3.9 AND sugar_level <= 4.5 THEN 1 ELSE 0 END) AS low,' +
            ' SUM(CASE WHEN sugar_level > 4.5 AND sugar_level <= 9.9 THEN 1 ELSE 0 END) AS target,' +
            ' SUM(CASE WHEN sugar_level > 9.9 AND sugar_level <= 16.9 THEN 1 ELSE 0 END) AS hi,' +
            ' SUM(CASE WHEN sugar_level > 16.9 THEN 1 ELSE 0 END) AS hyper' +
            ' FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    getCountOfTargetsAll: function (req, params, callback) {
        let db = req.db;
        var return_data = {};
        let pool = req.db;

        let sql_7 = 'SELECT count(*) AS target_range,' +
            ' SUM(CASE WHEN sugar_level <= 3.9 THEN 1 ELSE 0 END) AS hypo,' +
            ' SUM(CASE WHEN sugar_level > 3.9 AND sugar_level <= 4.5 THEN 1 ELSE 0 END) AS low,' +
            ' SUM(CASE WHEN sugar_level > 4.5 AND sugar_level <= 9.9 THEN 1 ELSE 0 END) AS target,' +
            ' SUM(CASE WHEN sugar_level > 9.9 AND sugar_level <= 16.9 THEN 1 ELSE 0 END) AS hi,' +
            ' SUM(CASE WHEN sugar_level > 16.9 THEN 1 ELSE 0 END) AS hyper' +
            ' FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 6 DAY';

        let sql_14 = 'SELECT count(*) AS target_range,' +
            ' SUM(CASE WHEN sugar_level <= 3.9 THEN 1 ELSE 0 END) AS hypo,' +
            ' SUM(CASE WHEN sugar_level > 3.9 AND sugar_level <= 4.5 THEN 1 ELSE 0 END) AS low,' +
            ' SUM(CASE WHEN sugar_level > 4.5 AND sugar_level <= 9.9 THEN 1 ELSE 0 END) AS target,' +
            ' SUM(CASE WHEN sugar_level > 9.9 AND sugar_level <= 16.9 THEN 1 ELSE 0 END) AS hi,' +
            ' SUM(CASE WHEN sugar_level > 16.9 THEN 1 ELSE 0 END) AS hyper' +
            ' FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 13 DAY';

        let sql_30 = 'SELECT count(*) AS target_range,' +
            ' SUM(CASE WHEN sugar_level <= 3.9 THEN 1 ELSE 0 END) AS hypo,' +
            ' SUM(CASE WHEN sugar_level > 3.9 AND sugar_level <= 4.5 THEN 1 ELSE 0 END) AS low,' +
            ' SUM(CASE WHEN sugar_level > 4.5 AND sugar_level <= 9.9 THEN 1 ELSE 0 END) AS target,' +
            ' SUM(CASE WHEN sugar_level > 9.9 AND sugar_level <= 16.9 THEN 1 ELSE 0 END) AS hi,' +
            ' SUM(CASE WHEN sugar_level > 16.9 THEN 1 ELSE 0 END) AS hyper' +
            ' FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 29 DAY';

        let sql_90 = 'SELECT count(*) AS target_range,' +
            ' SUM(CASE WHEN sugar_level <= 3.9 THEN 1 ELSE 0 END) AS hypo,' +
            ' SUM(CASE WHEN sugar_level > 3.9 AND sugar_level <= 4.5 THEN 1 ELSE 0 END) AS low,' +
            ' SUM(CASE WHEN sugar_level > 4.5 AND sugar_level <= 9.9 THEN 1 ELSE 0 END) AS target,' +
            ' SUM(CASE WHEN sugar_level > 9.9 AND sugar_level <= 16.9 THEN 1 ELSE 0 END) AS hi,' +
            ' SUM(CASE WHEN sugar_level > 16.9 THEN 1 ELSE 0 END) AS hyper' +
            ' FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 89 DAY';

        async.parallel([
                function (parallel_done) {
                    pool.query(sql_7, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table7 = results[0];
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_14, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table14 = results[0];
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_30, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table30 = results[0];
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_90, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table90 = results[0];
                        }
                        parallel_done();
                    });
                }
            ],
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, return_data);
                }
            });
    },

    getAverage: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT AVG(sugar_level) as avg FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time < CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY';
        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    getAverageAll: function (req, params, callback) {
        let db = req.db;
        // var pool = mysql.createPool(credentials);
        var return_data = {};

        let pool = req.db;

        let sql = 'SELECT AVG(sugar_level) as avg FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time < CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 0 DAY';

        let sql_7 = 'SELECT AVG(sugar_level) as avg FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time < CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 6 DAY';

        let sql_14 = 'SELECT AVG(sugar_level) as avg FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time < CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 13 DAY';

        let sql_30 = 'SELECT AVG(sugar_level) as avg FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time < CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 29 DAY';

        let sql_90 = 'SELECT AVG(sugar_level) as avg FROM sugar' +
            ' WHERE user_id = ?' +
            ' AND time < CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 89 DAY';

        async.parallel([
                function (parallel_done) {
                    pool.query(sql, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table1 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_7, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table7 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_14, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table14 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_30, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table30 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_90, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table90 = results;
                        }
                        parallel_done();
                    });
                }
            ],
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, return_data);
                }
            });
    },

    getMax: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MAX(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY' +
            ' ORDER BY sugar.time DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getMaxAll: function (req, params, callback) {
        let db = req.db;
        var return_data = {};

        let pool = req.db;

        let sql = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MAX(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 0 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 0 DAY';

        let sql_7 = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MAX(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 6 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 6 DAY';

        let sql_14 = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MAX(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 13 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 13 DAY';

        let sql_30 = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MAX(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 29 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 29 DAY';

        let sql_90 = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MAX(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 89 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 89 DAY';

        async.parallel([
                function (parallel_done) {
                    pool.query(sql, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table1 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_7, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table7 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_14, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table14 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_30, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table30 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_90, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table90 = results;
                        }
                        parallel_done();
                    });
                }
            ],
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, return_data);
                }
            });
    },

    getMin: function (req, params, callback) {
        let db = req.db;

        let sql = 'SELECT * FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MIN(s.sugar_level) AS min_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL ? DAY' +
            ' ORDER BY sugar.time DESC';

        db.query(sql, params, function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getMinAll: function (req, params, callback) {
        let db = req.db;
        var return_data = {};

        let pool = req.db;

        let sql = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MIN(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 0 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 0 DAY';

        let sql_7 = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MIN(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 6 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 6 DAY';

        let sql_14 = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MIN(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 13 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 13 DAY';

        let sql_30 = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MIN(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 29 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 29 DAY';

        let sql_90 = 'SELECT sugar_level FROM sugar' +
            ' WHERE sugar.sugar_level = (SELECT MIN(s.sugar_level) AS max_sugar FROM sugar s' +
            ' WHERE user_id = ? AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 89 DAY)' +
            ' AND time <= CURDATE() + INTERVAL 1 DAY AND time > CURDATE() - INTERVAL 89 DAY';

        async.parallel([
                function (parallel_done) {
                    pool.query(sql, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table1 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_7, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table7 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_14, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table14 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_30, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table30 = results;
                        }
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    pool.query(sql_90, params, function (err, results) {
                        if (err) {
                            return parallel_done(err);
                        } else {
                            return_data.table90 = results;
                        }
                        parallel_done();
                    });
                }
            ],
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, return_data);
                }
            });
    },
};
