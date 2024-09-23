# API REST AUTH para Gestión de Cómics, Librerías y Usuarios.

Este proyecto es una API REST AUTH desarrollada con Node.js, Express, MongoDB que permite gestionar cómics y librerías. Los usuarios pueden realizar operaciones CRUD tanto en la colección de cómics como en la de librerías.

# Estructura del proyecto
index.js
package.json
src
  -api
    - controllers
      - comics.js
      - librerias.js
      - users.js
    - models
      - comics.js
      - librerias.js
      - users.js
    - routes
      - comics.js
      - librerias.js
      - users.js
  - config
    - db.js
    - jwt.js
  - data
    - data.js
  - middlewares
    - auth.js
  - seeds
    - seed.js

# Instalación
1. Clonar el respositorio
   git clone https://github.com/joseluismaza/api-rest-auth/
2. Ir al directorio, abrir el programa e instalar las dependencias
   npm install / npm init -y
3. Ejecución
   npm start / npm run dev

Se iniciará el servidor en la ruta: http://localhost:3000
   
# Rutas disponibles
## COMICS
GET /api/v1/comics/not-verified - Obtiene los cómics no verificados
GET /api/v1/comics/precio/:precio - Obtiene los precios de los cómics según el valor se le indique
GET /api/v1/comics/categoria/:categoria - Obtiene la categoria de cómics según la que se indique
GET /api/v1/comics/:id - Obtiene el cómic indicado en la ID
GET /api/v1/comics/ - Obtiene todos los cómics
POST /api/v1/comics/ - Publica un cómic
PUT /api/v1/comics/:id - Actualiza el cómic por ID
DELETE /api/v1/comics/:id - Elimina el cómic indicando la ID

## LIBRERIAS
GET /api/v1/librerias/
GET /api/v1/librerias/:id
POST /api/v1/librerias/
PUT /api/v1/librerias/:id
DELETE /api/v1/librerias/:id

## USUARIOS
GET /api/v1/users/
POST /api/v1/users/register
POST /api/v1/users/login
DELETE /api/v1/users/:id


# Conexión a la Base de Datos
El archivo src/config/db.js maneja la conexión a la base de datos MongoDB usando la variable de entorno DB_URL. Asegúrate de tener una insstancia de MongoDb en ejecución o estar conectado a MongoDB Atlas.

# Despliegue
Para desplegar esta API en producción, se recomienda configurar un entorno seguro, gestionar las variables de entorno adecuadamente y usar un servicio de hosting como Heroku o AWS.

# Contribuciones
Las contribuciones son bienvenidas. Si encuentras algún error o tienes sugerencias, por favor abre un issue o envía un pull request.

#Licencia
Este archivo proporciona una guía completa sobre cómo configurar, ejecutar y usar la API, así como detalles sobre la estructura del proyecto y las rutas disponibles.


