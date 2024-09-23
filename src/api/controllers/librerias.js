const Libreria = require("../models/librerias");


const getLibrerias = async (req, res, next) => {
  try {
    const librerias = await Libreria.find().populate("comics");
    return res.status(200).json(librerias);
  } catch (error) {
    return res.status(400).json("No se han podido obtener los datos de las librerias")

  }
}

const getLibreriaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const librerias = await Libreria.findById(id).populate("comics");
    return res.status(200).json(librerias);
  } catch (error) {
    return res.status(400).json("No se encuentra ningúna libreria con ese nombre")
  }
}

const postLibrerias = async (req, res, next) => {
  try {
    const newLibreria = new Libreria(req.body);
    const libreriaSaved = await newLibreria.save();
    return res.status(201).json(libreriaSaved);

  } catch (error) {
    return res.status(400).json("No se ha publicado ningúna libreria")

  }
}

const updateLibrerias = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Si `req.body.comics` existe , con addtoSet evitamos fuplicados
    if (req.body.comics) {
      const libreriaUpdated = await Libreria.findByIdAndUpdate(
        id,
        { $addToSet: { comics: { $each: req.body.comics } } }, // Evita duplicados
        { new: true }
      );
      return res.status(200).json(libreriaUpdated);
    }
    const libreriaUpdated = await Libreria.findByIdAndUpdate(id, req.body, { new: true, });
    return res.status(200), json(libreriaUpdated);
  } catch (error) {
    return res.status(400).json("No se ha actualizado ninguna librería");
  }
};
const deleteLibrerias = async (req, res, next) => {
  try {
    const { id } = req.params;
    const libreriaDeleted = await Libreria.findByIdAndDelete(id);
    return res.status(200).json(libreriaDeleted);
  } catch (error) {
    return res.status(400).json("El borrado no ha sido satisfactorio")

  }
}

module.exports = {
  getLibrerias,
  postLibrerias,
  updateLibrerias,
  deleteLibrerias,
  getLibreriaById
}