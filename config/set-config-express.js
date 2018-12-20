const bodyParser = require('body-parser');

var expressConfig = function(app){
    //Asigno a la variable un valor, en este caso es la configuracion para express o el resto de la app
    app.set('configuracionServidor', require('./config'));
  
    // support parsing of application/json type post data
    app.use(bodyParser.json());

    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));

    //CORS Middleware
    app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
   });

}

module.exports = expressConfig;