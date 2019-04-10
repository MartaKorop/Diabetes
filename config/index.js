module.exports = {
    dbConfig: function (req, res, next) {
        return{
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'diabet',
        }
    },

    validateEmail: function(inputText) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            return true;
        } else {
            return false;
        }
    },

    smtpConfig: function(req, res, next) {
        return {
            service: 'Gmail',
            auth: {
                user: 'holynicholaslviv',
                pass: '123456789zxcvbn'
            },
        }
    },

    requireLogin: function(req, res, next) {
        if (!req.session.user) {
            res.redirect('/signin?dest=' + req.baseUrl);
        } else {
            next();
        }
    },
};