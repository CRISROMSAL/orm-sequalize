Proceso para general los modelos:
Ejecutar el terminar:

npx sequelize-auto -h localhost -d api_rest_db -u root -p 3306  -e mysql -o "./models" -l esm

EXPLICACIÓN PROYECTO
Este proyecto es una solución integral para la gestión de datos mediante una API REST desarrollada con Node.js y el ORM Sequelize. La aplicación implementa una arquitectura desacoplada y un sistema de generación de código automático para maximizar la eficiencia en el desarrollo.

Arquitectura:
Se ha implementado una arquitectura de Capa de Servicios que separa la lógica de acceso a datos de la lógica de control HTTP, cumpliendo con los principios de responsabilidad única:
-Modelos (Sequelize): Representación de las tablas de la base de datos MariaDB/MySQL.
-Servicios: Capa donde reside la lógica de negocio y la interacción directa con los modelos de Sequelize.
-Controladores: Encargados de gestionar las peticiones entrantes y formatear las respuestas JSON.
-Rutas: Puntos de entrada de la API organizados por recursos.

Características:
-Sistema AutoCRUD (Generador de Código)
El script autocrud.js analiza los modelos existentes y genera automáticamente los archivos de Servicio, Controlador y Ruta para cada entidad. Esto permite escalar la API a nuevas tablas en segundos sin intervención manual.
-Registro Automático de Log 
Se ha integrado un sistema de auditoría en la capa de servicios que registra cada operación de creación y eliminación:
Automatización: Al insertar o borrar un registro en cualquier tabla, se genera una entrada en la tabla log.
Transparencia: Los registros de log incluyen el ID de la operación y el recurso afectado para facilitar el seguimiento.

Requisitos:
-Entorno: Tener instalado Node.js y XAMPP (Apache y MySQL activos).
-Base de Datos: Crear una base de datos en phpMyAdmin llamada api_rest_db.
-Configuración: Asegurar que las credenciales en config/db.js coincidan con el entorno local.
-Dependencias: Instalar los módulos necesarios: npm install

Funcionamiento:
1.Generación de estructura:
node autocrud.js
Este comando crea las carpetas services, controllers/base y routes con la lógica de logs incluida.
2.Inicio del Servidor:
node server.js
El servidor se iniciará en localhost y sincronizará los modelos con la base de datos.

Prueba con Postman 
Crear un producto nuevo con POST poniendo el endpoint /api/productos

Estructura del repositorio:
/config: Configuración de la conexión a la DB.
/models: Definición de modelos e inicialización (incluye init-models.js).
/services: Lógica de negocio y persistencia.
/controllers: Lógica de control de flujo.
/routes: Definición de rutas de la API.
autocrud.js: Script de automatización.
server.js: Punto de entrada de la aplicación.
