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
};