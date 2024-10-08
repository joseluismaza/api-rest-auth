const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  //relación entre colecciones
  {
    libreria: { type: mongoose.Schema.Types.ObjectId, ref: "Libreria" }, //vincular usuario con libreria en concreto
    comicsComprados: [{ type: mongoose.Schema.Types.ObjectId, ref: "comics" }] //array de comics comprados por el usuario

  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);//número de saltos que se encripta la contraseña
})

const User = mongoose.model("users", userSchema, "users");
module.exports = User;
