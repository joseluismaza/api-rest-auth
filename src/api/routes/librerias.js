const libreriaRouter = require("express").Router();
const { getLibrerias, postLibrerias, updateLibrerias, deleteLibrerias, getLibreriaById } = require("../controllers/librerias");
const { isAdmin } = require("../../middlewares/auth");


libreriaRouter.get("/", getLibrerias);
libreriaRouter.get("/:id", getLibreriaById);
libreriaRouter.post("/", [isAdmin], postLibrerias);
libreriaRouter.put("/:id", [isAdmin], updateLibrerias);
libreriaRouter.delete("/:id", [isAdmin], deleteLibrerias);

module.exports = libreriaRouter;