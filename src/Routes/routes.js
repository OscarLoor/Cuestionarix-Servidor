var routesCreadas = function(app){
    //Obtengo los controladores
    var UsuarioController = require('../Controller/usuariosController');
   
    app.route('/ingresar')
        .post(UsuarioController.authUsuario); //Envio email y contraseña
    
    app.route('/usuarios')
        .get(UsuarioController.mostrarUsuarios) //Envio token y id de usuario
        .post(UsuarioController.crearUsuario) //Envio datos de usuario
        .put(UsuarioController.modificarUsuario) //Envio datos de usuario
        .delete(UsuarioController.eliminarUsuario); //Envio el id del usuario a eliminar
}

module.exports = routesCreadas;

