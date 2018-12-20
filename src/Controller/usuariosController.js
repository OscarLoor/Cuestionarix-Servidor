//Obtengo el modelo
var UsuarioModelo = require('../Model/usuarios.js');
//Obtengo los metodos que seran llamados desde la api

/**
 *  Acceso publico 
 */
exports.crearUsuario = function(req, res){
    //Verifico que los datos ingresados estan correctos

    //Si estan correctos
    // 1) Creo el objeto con los datos recibidos
    var nuevoUsuario = new UsuarioModelo(req.body);
    // 2) Verifico que no existe el email en la base de datos

    // 3) Guardo en la base de datos enviando el objeto de la clase
    UsuarioModelo.crear(nuevoUsuario, function(err, resultado){
        if(err){
            res.status(400).send({ error:true, message: err });
        }else{
            res.status(200).send({ error:false, message: 'Ingresado correctamente' });
        }
        
    });
}
/**
 *  Acceso publico 
 */
exports.authUsuario = function(req, res){
    //Verifico que los datos ingresados estan correctos

    //Si estan correctos
    var datosRecibidos = req.body;

    UsuarioModelo.buscarPorEmail(datosRecibidos.email, function(err, resultado){
        if(err){
            res.status(400).send({ error:true, message: err });
        }else{
            //Verifico que el usuario ingreso la clave correctamente, comparando con el guardado en BD
            if(resultado == datosRecibidos.password){
                //Si esta correcto necesito generar un token para permitir el acceso a rutas con autenticacion

                //En este caso quemare un token generado por mi
                //correctamente necesitaria generar algo como JWT
                tokenParaAcceder = "rutasSecretas";

                //Devuelvo que esta correcto
                res.status(200).send({ error:false, message: 'Autenticacion realizada correctamente', token: tokenParaAcceder});
            }else{
                res.status(400).send({ error:true, message: 'Contraseña incorrecta' });
            }
        }
        
    });
}

/**
 *  Acceso no publico 
 */
exports.mostrarUsuarios = function(req, res){
    var datosRecibidos = req.body;
    var idRecibido = datosRecibidos.id;
    var tokenRecibido = datosRecibidos.token;
    if("rutasSecretas" == tokenRecibido){
        //Tengo acceso
        
        UsuarioModelo.mostrarTodos(idRecibido, function(err, resultado){
            if(err){
                res.status(400).send({ error:true, message: err });
            }else{
                res.status(200).send({ error:true, message: resultado });
            }
        });
        
    }else{
        //No tengo acceso
        res.status(400).send({ error:true, message: 'Acceso no permitido' });
    }
}
/**
 * Acceso no publico
 */
exports.modificarUsuario = function(req, res){
    var idRecibido = req.body.id;
    var tokenRecibido = req.body.token;
    if("rutasSecretas" == tokenRecibido){
        //Tengo acceso
            
        //Verifico que los datos ingresados estan correctos

        //Si estan correctos
        // 1) Creo el objeto con los datos recibidos
        var usuarioAnterior = req.body;
        
        // 2) Verifico que no existe el email en la base de datos

        // 3) Guardo en la base de datos enviando el objeto de la clase
        UsuarioModelo.actualizar(usuarioAnterior, function(err, resultado){
            if(err){
                res.status(400).send({ error:true, message: err });
            }else{
                res.status(200).send({ error:false, message: 'Modificado correctamente' });
            }
            
        });
    }else{
        //No tengo acceso
        res.status(400).send({ error:true, message: 'Acceso no permitido' });
    }

}

/**
 * Acceso no publico
 */
exports.eliminarUsuario = function(req, res){
    var idRecibido = req.body.id;
    var tokenRecibido = req.body.token;
    if("rutasSecretas" == tokenRecibido){
        //Tengo acceso

            
        //Verifico que los datos ingresados estan correctos

        //Si estan correctos
        // 1) Creo el objeto con los datos recibidos
        var idRecibido = req.body.id;
        
        // 2) Verifico que no existe el email en la base de datos

        // 3) Guardo en la base de datos enviando el objeto de la clase
        UsuarioModelo.eliminar(idRecibido, function(err, resultado){
            if(err){
                res.status(400).send({ error:true, message: err });
            }else{
                res.status(200).send({ error:false, message: 'Eliminado correctamente' });
            }
            
        });
        
    }else{
        //No tengo acceso
        res.status(400).send({ error:true, message: 'Acceso no permitido' });
    }
    
}