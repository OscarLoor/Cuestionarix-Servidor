const bodyParser = require('body-parser');

var expressConfig = function(app){
    //Asigno a la variable un valor, en este caso es la configuracion para express o el resto de la app
    app.set('configuracionServidor', require('./config'));
  
    // support parsing of application/json type post data
    app.use(bodyParser.json());

    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
}

module.exports = expressConfig;