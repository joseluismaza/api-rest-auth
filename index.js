const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./src/config/db");
const comicsRouter = require("./src/api/routes/comics");
const libreriaRouter = require("./src/api/routes/librerias");
const usersRoutes = require("./src/api/routes/users");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//rutas de acceso
app.use("/api/v1/comics", comicsRouter);
app.use("/api/v1/librerias", libreriaRouter);
app.use("/api/v1/users", usersRoutes);

app.use("*", (req, res, next) => {
  return res.status(404).json("Ruta no encontrada")
});

// levantar servidor
app.listen(3000, () => {
  console.log("Servidor levantado: http://localhost:3000");
})