# Proyecto: Gestión de Usuarios

Este proyecto permite gestionar usuarios utilizando **Node.js** y el módulo **fs** para la persistencia de datos en un archivo JSON. Implementa operaciones CRUD, manejo de errores, y utiliza variables de entorno para la configuración de rutas de los archivos.

## Requisitos

- Node.js v14.0.0 o superior
- npm v6.0.0 o superior

## Instalación

Para clonar el proyecto y configurar el entorno localmente, sigue estos pasos:

1. Clona el repositorio en tu máquina:

    ```bash
    git clone https://github.com/Miguel01Pacheco/utn_back_end_proyecto_uno.git
    ```

2. Accede al directorio del proyecto:

    ```bash
    cd gestion-usuarios
    ```

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

4. Crea un archivo `.env` en la raíz del proyecto y define las rutas de los archivos:

    ```bash
    PATH_FILE_USER=./data/users.json
    PATH_FILE_ERROR=./error/log.json
    ```

## Uso

Los siguientes comandos están disponibles para ejecutar desde la terminal:

### Listar Usuarios0
```bash
node index.js list

### Buscar un usuario por su ID
```bash
node index.js get <id_usuario>

### Agregar Usuario
```bash
node index.js add <nombre> <apellido> <email> <password>

### Modificar Usuario
```bash
node index.js update <id_usuario> <campo> <nuevo_valor>

### Eliminar  Usuario
```bash
node index.js delete <id_usuario>

Estructura del Proyecto
/data/users.json: Archivo donde se almacenan los datos de los usuarios.
/error/log.json: Archivo donde se registran los errores ocurridos durante la ejecución.
/utils/handleError.js: Módulo que maneja y registra errores en el archivo de logs.
/models.js: Contiene las funciones principales para gestionar los usuarios (listar, obtener, agregar, modificar, eliminar).
Validaciones
Todos los campos son obligatorios para crear o modificar un usuario.
El email debe ser único entre los usuarios.
Las contraseñas se almacenan hasheadas por seguridad.
Manejo de Errores
Los errores como usuarios no encontrados, emails duplicados, o datos faltantes serán registrados en el archivo log.json ubicado en el directorio /error.


