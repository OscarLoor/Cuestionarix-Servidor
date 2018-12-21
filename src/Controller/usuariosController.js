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
            
            if(err ="ER_DUP_ENTRY"){
                res.status(400).send({ error:true, message: "Ya existe un usuario con ese correo" });
            }else{
                res.status(400).send({ error:true, message: err });
            }
            
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

    UsuarioModelo.ingresoPorEmail(datosRecibidos.email, datosRecibidos.password, function(err, resultado){
        if(err){
            res.status(400).send({ error:true, message: err });
        }else{
            res.status(200).send({ error:false, message: 'Ingreso correcto', token: resultado });
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
                res.status(200).send({ error:false, message: resultado });
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
        var idPorBorrar = req.body.idPorBorrar;
        
        // 2) Verifico que no existe el email en la base de datos

        // 3) Guardo en la base de datos enviando el objeto de la clase
        UsuarioModelo.eliminar(idPorBorrar, idRecibido, function(err, resultado){
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