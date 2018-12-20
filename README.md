# Cuestionarix-Servidor

Instalar dependencias
npm install

------------------------------
Para base de datos: MySQL
------------------------------
Configurar el archivo src/Model/db.js con la configuracion de la base de datos, actualmente esta con una remota en mi propio servidor

-Crear tabla: integrae_cuestionarix
-Crear usuario: integrae_cuestio
-Contraseña: QJn&hh{Xx{W4
-Importar SQL para generar tabla (Archivo sql dentro de la raiz del proyecto - integrae-cuestionarix.sql)

---------------------------
Ejecutar servidor
----------------------------
-Configurar el puerto del servidor desde el archivo: config/config.js la propiedad port
-node index.js


