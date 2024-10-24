const { generateSign } = require("../../config/jwt");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: "user"
    });

    //evitar usuarios duplicados
    const userDuplicated = await User.findOne({ userName: req.body.userName });
    if (userDuplicated) {
      return res.status(400).json("El nombre de usuario ya existe");
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(404).json("Registro incorrecto");
  }
}

const login = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ userName: req.body.userName });

    if (!userExist) {
      return res.status(400).json("El usuario o contraseña son incorrectos");
    }


    if (userExist) {
      if (bcrypt.compareSync(req.body.password, userExist.password)) {//comparación de contraseñas
        //login jsonwebtoken
        const token = generateSign(userExist._id, userExist.rol);
        return res.status(200).json({ userExist, token });
      } else {
        return res.status(400).json("El usuario o contraseña son incorrectos");
      }
    }
  } catch (error) {
    return res.status(404).json(error);

  }
}
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    //Permitir que el usuario elimine su propio perfil o el admin elimine cualquiera
    if (req.user._id.toString() !== id && req.user.rol !== "admin") {
      return res.status(403).json("No tienes permisos para eliminar a este usuario");
    }
    const userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) {
      return res.status(404).json("Usuario no encontrado");
    }
    return res.status(200).json({
      mensaje: "El usuario ha sido eliminado",
      userDeleted,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
}

const getUser = async (req, res, next) => {
  try {

    //buscar los usuarios y con .populate() traemos las relaciones
    const users = await User.find();//.populate('libreria comicsComprados');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    //verificar si el usuario es administrador
    if (req.user.rol !== "admin") {
      return res.status(403).json("No tienes permisos para realizar esta acción");
    }
    const userUpdate = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(userUpdate);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error al actualizar el usuario");
  }
}

module.exports = { register, login, deleteUser, getUser, updateUser }