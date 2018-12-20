//Inicializo el servidor express
const express = require('express');
const app = express();

//Configuración de la aplicación express
require('./config/set-config-express')(app);

//Obtengo las rutas de la app
require('./src/Routes/routes')(app);

//Ejecuto el servidor
let puertoServidor = app.get('configuracionServidor').port;
app.listen(puertoServidor, function() {
  console.log('El servidor esta activo y escuchando en el puerto: ' + puertoServidor)
});