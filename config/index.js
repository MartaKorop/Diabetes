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
};