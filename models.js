import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { handleError } from "./utils/handleError.js";
import  { createUserObject, createUpdateUserObject } from "./utils/createObjetcUser.js"

// 2° Declarar los metodos

//Función para listar los usuarios
const getUsers = (urlFile, urlError) => {
  try {
    if (!urlFile){
      throw new Error("Acceso denegado!");
    }
    const exist = existsSync(urlFile);
    if (!exist){
      writeFileSync(urlFile,JSON.stringify([]));
      return [];
    }
    const usuarios = JSON.parse(readFileSync(urlFile));
    return usuarios;
  } catch (error) {
    const objError = handleError(error, urlError);
    return objError;
  }
};
//Función que busca un usuario por su ID
const getUserById = (id,urlUser, urlError) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }
    
    const users = getUsers(urlUser);

    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;

  } catch (error) {
      const objError = handleError(error, urlError);
      return objError;
  }
};

// addUser recibe un objeto con toda la data para el nuevo usuario
// valida que esten los datos míminos para añadir un nuevo usuario
// valida que el nombre sea un string
// valida que el apellido sea un string
// valida que el email sea un string y que no se repita
const addUser = async (userData, urlUser, urlError) => {
  try {
    if (!userData) {
      console.log(userData);
      throw new Error("Missing data");
    }

    const users = getUsers(urlUser);

    // Esperar a que se cree el nuevo usuario de manera asíncrona
    const newUser = await createUserObject(userData, users);

    users.push(newUser);

    // Guardar el array actualizado de usuarios
    writeFileSync(urlUser, JSON.stringify(users, null, 2));

    return newUser;

  } catch (error) {
    const objError = handleError(error, urlError);
    return objError;
  }
};

// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (userData, urlUser, urlError) => {
  try {
    const {id ,nombre, apellido, email, password }= userData;
    if ( !id || !userData){
      throw new Error("ID is missing");
    }
    
    const users = getUsers(urlUser);
    const user = createUpdateUserObject(getUserById(id));



    writeFileSync(urlUser, JSON.stringify(users));
    return user;

  } catch (error) {
       const objError = handleError(error,urlError);
       return objError;
  }
};

const deleteUser = (id,urlError, urlUser) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
  } 
  const users = getUsers(urlUser);
    const user = getUserById(id);

    const newUsers = users.filter((user) => user.id !== id);

    writeFileSync(urlUser, JSON.stringify(newUsers));

    return user;
  } catch (error) {
      const objError = handleError(error, urlError);
      return objError;
  }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
