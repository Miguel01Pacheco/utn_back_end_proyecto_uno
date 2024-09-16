import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
// Averiguar que importar de NODE para realizar el hash del pass
// Averiguar como "activar" la lectura de las variables de entorno del archivo .env (dotenv)
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";
import { error } from "node:console";

// 1° recuperar variables de entorno
dotenv.config();
// env -> enviroment
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

// 2° Declarar los metodos

//Función para listar los usuarios
const getUsers = (urlFile) => {
  try {
    if (!urlFile){
      throw new Error("Acceso denegado!");
    }
    const exist = existsSync(urlFile);
    if (!exist){
      writeFileSync(urlFile,JSON.stringify([]));
      return [];
    }
    const usuarios = JSON.parse(readFileSync(ulrFile));
    return usuarios;
  } catch (error) {
    //const objError = handleError(error, PATH_FILE_ERROR);
   // return objError;
  }
};
//Función qque busca un usuario por su ID
const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }
  } catch (error) {
    //const objError = handleError(error, PATH_FILE_ERROR);
    //return objError;
  }
};

// addUser recibe un objeto con toda la data para el nuevo usuario
// valida que esten los datos míminos para añadir un nuevo usuario
// valida que el nombre sea un string
// valida que el apellido sea un string
// valida que el email sea un string y que no se repita
// hashea la contraseña antes de registrar al usuario
const addUser = (userData) => {
  try {
    const {nombre,apellido, email, password} = userData;
    if (!nombre || !apellido || !email || !password) {
      throw new Error("Missing data");
    }

    const newUser ={
      id : randomUUID(),
      nombre : userData.nombre,
      apellido : userData.apellido,
      email : userData.email,
      password : userData.password,
      isLoggedIn : false,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    }
    const users = getUsers(PATH_FILE_USER);

    users.push(newUser);

    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return newUser;


  } catch (error) {
     //const objError = handleError(error, PATH_FILE_ERROR);
     //return objError
  }
};

// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (userData) => {
  try {
    const {id ,nombre, apellido, email, password }= userData;
    if ( !id || !userData){
      throw new Error("ID is missing");
    }
    
    const users = getUsers(PATH_FILE_USER);
    const user = getUserById(id);

    if (nombre) user.nombre = nombre;
    if (apellido) user.apellido = apellido;
    if (email) user.email = email;
    if (password) user.password = password;
   
    user.updateAt = new Date().toISOString();

    writeFileSync(PATH_FILE_USER, JSON.stringify(users));
    return user;

  } catch (error) {
     //const objError = handleError(error, PATH_FILE_ERROR);
     //return objError;
  }
};

const deleteUser = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
  } 
  const users = getUsers(PATH_FILE_USER);
    const user = getUserById(id);

    const newUsers = users.filter((user) => user.id !== id);

    writeFileSync(PATH_FILE_USER, JSON.stringify(newUsers));

    return user;
  } catch (error) {
    //const objError = handleError(error, PATH_FILE_ERROR);
     //return objError;
  }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
