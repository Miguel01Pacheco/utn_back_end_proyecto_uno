// 1° objetener los argumentos pasador por terminal (que vienen del index)
// 2° desarrollar las funciones que crean los objetos para añadir un usario y actualizar un usuario
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";

// Hashear la contraseña
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await hash(password, saltRounds);
};

// Validar si el email ya existe
const validateEmail = (email, users) => {
  return users.some(user => user.email === email);
};

// Crear nuevo usuario
const createUserObject = async ([ nombre, apellido, email, password], users) => {
  if (!nombre || !apellido || !email || !password) {
    throw new Error("Faltan datos para crear el usuario");
  }

  if (validateEmail(email, users)) {
    throw new Error("El email ya está en uso");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    id: randomUUID(),
    nombre,
    apellido,
    email,
    password: hashedPassword,
    isLoggedIn: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newUser;
};

// Actualizar usuario
const createUpdateUserObject = async (user, { nombre, apellido, email, password }, users) => {
  if (nombre) user.nombre = nombre;
  if (apellido) user.apellido = apellido;

  // Validar email, pero excluir el del propio usuario
  if (email && email !== user.email && validateEmail(email, users)) {
    throw new Error("El email ya está en uso");
  }

  if (email) user.email = email;

  if (password) {
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
  }

  user.updatedAt = new Date().toISOString();
  return user;
};

export { createUserObject, createUpdateUserObject };
