//Obtengo la base de datos
var sql = require('./db.js');
//Creo la estructura base
var UsuarioModelo = function(usuario){
    this.nombres = usuario.nombres;
    this.apellidos = usuario.apellidos;
    this.cedula = usuario.cedula;
    this.password = usuario.password;
    this.email = usuario.email;
    this.fechaCreacion = usuario.fechaCreacion;
    this.fechaActualizacion = usuario.fechaActualizacion;
    this.fechaUltimoAcceso = usuario.fechaUltimoAcceso;
}
//Defino los metodos que necesito

/**
 * Crear usuarios
 * 
*/
UsuarioModelo.crear = function(usuarioRecibido, result){
    //Obtengo la fecha de creacion y le asigno al usuario
    usuarioRecibido.fechaCreacion = new Date();
     
    sql.query("INSERT INTO Usuarios set ?", usuarioRecibido, function(err, res){
        if(err) {
            console.log("Error al ingresar un usuario: "+ err.code);
            result(err.code, null);
        }else{
            console.log("Se agrego un usuario con ID: "+ res.insertId);
            result(null, res.insertId);
        }
    })
}

UsuarioModelo.ingresoPorEmail = function(emailRecibido, passwordRecibido, result){
    
     
    sql.query("Select password, id from Usuarios where email = ? ", emailRecibido, function(err, res){
        if(err) {
            console.log("Error al buscar un usuario: "+ err);
            result(err, null);
        }else{
            if(res[0] == undefined){
                //Si no encuentra el email ingresado
                result("No se encontro", null);
            }else{
                //Verifico que el usuario ingreso la clave correctamente, comparando con el guardado en BD
                if(res[0].password == passwordRecibido){
                    //Adicional tengo que registrar la hora del ingreso
                    var fechaUltimoAcceso = new Date();
                    var query = "Update Usuarios set fechaUltimoAcceso = ? where id = ?";
                    var arregloDatosNuevos = [
                        fechaUltimoAcceso,
                        res[0].id
                    ];
                    
                    sql.query(query, arregloDatosNuevos, function(err, res){
                        if(err) {
                            console.log(err);
                            console.log("Error al actualizar fecha de ingreso"+ err.code);
                            result(err.code, null);
                        }else{
                            if(res.affectedRows != 0){
                                console.log("Se modifico el usuario: ");
                                //Si esta correcto necesito generar un token para permitir el acceso a rutas con autenticacion

                                //En este caso quemare un token generado por mi
                                //correctamente necesitaria generar algo como JWT
                                tokenParaAcceder = "rutasSecretas";
                                respuestaObtenida = [
                                    token = tokenParaAcceder,
                                    idUsuario = arregloDatosNuevos[1]
                                ];
                                
                                //Devuelvo que esta correcto
                                result(null, respuestaObtenida);
                            }else{
                                console.log("No se modifico el registro");
                                result("No se modifico el registro", null);
                            }
                            
                        }
                    })
                    
    
                }else{
                    result("Contraseña incorrecta", null);
                }
            }            
        }
    })
}

esAdministrador = function(idRecibido){
    if((idRecibido % 3) == 0 || idRecibido == 1){
        return true;
    }else{
        return false;
    }
}
UsuarioModelo.mostrarTodos = function(idRecibido, result){
    
     
    sql.query("Select id, nombres, apellidos, cedula, email, fechaCreacion, fechaActualizacion, fechaUltimoAcceso from Usuarios", function(err, res){
        if(err) {
            console.log("Error al buscar usuarios: "+ err);
            result(err, null);
        }else{
            if(res[0] == undefined){
                //Si no encuentra el email ingresado
                result("No se encontro", null);
            }else{
                //Verifico el tipo de rol
                if(esAdministrador(idRecibido)){
                    //1) Si es administrador
                    //Devuelvo todos
                    result(null, res);
                }else{
                    //2) Si no es administrador
                    //Devuelvo sin administradores
                    var arregloDeUsuariosNoAdministradores = [];
                    res.forEach(element => {
                        if(!esAdministrador(element.id)){
                            //No es administrador
                            arregloDeUsuariosNoAdministradores.push(element);
                        }
                      
                    });

                    result(null, arregloDeUsuariosNoAdministradores);
                }
                
            }            
        }
    })
}

UsuarioModelo.actualizar = function(usuarioRecibido, result){
    //Verifico que no sea un administrador
    if(!esAdministrador(usuarioRecibido.id)){
        //Obtengo la fecha de creacion y le asigno al usuario
        usuarioRecibido.fechaActualizacion = new Date();
        var query = "Update Usuarios set nombres = ?, apellidos = ?, cedula = ?, password = ?, email = ?, fechaActualizacion = ? where id = ?";
        var arregloDatosNuevos = [
            usuarioRecibido.nombres, 
            usuarioRecibido.apellidos, 
            usuarioRecibido.cedula,
            usuarioRecibido.password,
            usuarioRecibido.email,
            usuarioRecibido.fechaActualizacion,   
            usuarioRecibido.id
        ];
        
        sql.query(query, arregloDatosNuevos, function(err, res){
            if(err) {
                console.log(err);
                console.log("Error al ingresar un usuario: "+ err.code);
                result(err.code, null);
            }else{
                if(res.affectedRows != 0){
                    console.log("Se modifico el usuario: ");
                    console.log(res);
                    result(null, res);
                }else{
                    console.log("No se modifico el registro");
                    result("No se modifico el registro", null);
                }
                
            }
        })
    }else{
        result("No puedes modificar a usuarios administradores", null);
    }

    
}


UsuarioModelo.eliminar = function(idUsuario, result){
    if(!esAdministrador(idUsuario)){
        sql.query("DELETE FROM Usuarios WHERE id = ?", [idUsuario], function (err, res) {

            if(err) {
                console.log(err);
                console.log("Error al ingresar un usuario: "+ err.code);
                result(err.code, null);
            }else{
                if(res.affectedRows != 0){
                    console.log("Se elimino el usuario: ");
                    console.log(res);
                    result(null, res);
                }else{
                    console.log("No se elimino el registro");
                    result("No se elimino el registro", null);
                }              
            }
        }); 
    }else{
        result("No puedes modificar a usuarios administradores", null);
    }
}

module.exports= UsuarioModelo;