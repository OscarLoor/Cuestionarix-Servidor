var routesCreadas = function(app){
    //Obtengo los controladores
    var UsuarioController = require('../Controller/usuariosController');
   
    app.route('/ingresar')
        .post(UsuarioController.authUsuario); //Envio email y contraseña
    
    app.route('/mostrarUsuarios')
        .post(UsuarioController.mostrarUsuarios) //Envio token y id de usuario, es POST para poder enviar token y el id
    app.route('/usuarios')
        .post(UsuarioController.crearUsuario) //Envio datos de usuario
        .put(UsuarioController.modificarUsuario) //Envio datos de usuario
        .delete(UsuarioController.eliminarUsuario); //Envio el id del usuario a eliminar
}

module.exports = routesCreadas;

