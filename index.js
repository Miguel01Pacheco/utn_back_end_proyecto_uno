import dotenv from "dotenv";
import { getUsers, getUserById, addUser, updateUser, deleteUser } from "./models.js";
import { handleError } from "./utils/handleError.js";

// 1° recuperar variables de entorno
dotenv.config();
const urlUser = process.env.PATH_FILE_USER;
const urlError = process.env.PATH_FILE_ERROR;

// 1° recibir los argumentos pasados por la terminal
const args = process.argv.splice(2);
const action = args[0];

// 2° hacer el switch asíncrono
const run = async () => {
  try {
    switch (action) {
      case 'list': {
        const users = await getUsers(urlUser, urlError);
        console.log(users);
        break;
      }
      case 'get': {
        const userById = await getUserById(args[1], urlUser, urlError);
        console.log(userById);
        break;
      }
      case 'add': {
        const userAdd = await addUser(args.splice(1), urlUser, urlError);
        console.log("Usuario añadido con exito");
        break;
      }
      case 'update': {
        const userUpdate = await updateUser(args, urlUser, urlError);
        console.log(userUpdate);
        break;
      }
      case 'delete': {
        const deletedUser = await deleteUser(args[1], urlUser, urlError);
        console.log(deletedUser);
        break;
      }
      default: {
        throw new Error("Ingrese una opción válida");
      }
    }
  } catch (error) {
    const objError = handleError(error, urlError);
    console.error("Error:", objError);
  }
};

run();
