module.exports = {
    dbConfig: function (req, res, next) {
        return{
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'diabetes',
            multipleStatements: true,
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
                user: 'diabetesdiary2019',
                pass: '123456789Diabetes'
            },
        }
    },

    requireLogin: function(req, res, next) {
        if (!req.session.user) {
            res.redirect('/signin?dest=' + req.originalUrl);
            // res.redirect('http://localhost:8000/signin.html');
        } else {
            next();
        }
    },
};
