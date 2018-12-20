var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : '199.168.189.114',
    port     :  3306,
    user     : 'integrae_cuestio',
    password : 'QJn&hh{Xx{W4',
    database : 'integrae_cuestionarix'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;