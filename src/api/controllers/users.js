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
        const token = generateSign(userExist._id);
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
    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "El usuario ha sido eliminado",
      userDeleted,
    })
  } catch (error) {
    return res.status(400).json(error);
  }
}

const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = { register, login, deleteUser, getUser }