let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                next(err);
            } else {
                res.redirect('/');
            }
        });
    }
});

module.exports = router;
