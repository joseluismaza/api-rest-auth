const Comic = require("../models/comics")

const getComics = async (req, res, next) => {
  try {
    const comics = await Comic.find({ verified: true });
    return res.status(200).json(comics);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

const getComicsAdmin = async (req, res, next) => {
  try {
    const comics = await Comic.find({ verified: false });
    return res.status(200).json(comics);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

const getComicsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comics = await Comic.findById(id);
    return res.status(200).json(comics);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

const getComicsByCategory = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const comics = await Comic.find({ categoria });
    return res.status(200).json(comics);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

const getComicsByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params;
    const comics = await Comic.find({ precio: { $lte: precio } });
    return res.status(200).json(comics);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

const postComic = async (req, res, next) => {
  try {
    const newComic = new Comic(req.body);

    // queremos que el juego si lo está creando un usuario normal el campo verified esté obligatoriamente en false
    // cuando lo crea un admin está en true

    if (req.user.rol === "admin") {
      newComic.verified = true;
    } else {
      newComic.verified = false;
    }

    const comicSaved = await newComic.save();

    return res.status(201).json(comicSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const putComic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newComic = new Comic(req.body);
    newComic._id = id;
    const comicUpdated = await Comic.findByIdAndUpdate(id, newComic, {
      new: true,
    });
    return res.status(200).json(comicUpdated);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

const deleteComic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comicDeleted = await Comic.findByIdAndDelete(id);
    return res.status(200).json(comicDeleted);
  } catch (error) {
    return res.status(400).json("Error en la solicitud");
  }
};

module.exports = {
  getComics,
  getComicsAdmin,
  getComicsById,
  getComicsByCategory,
  getComicsByPrice,
  postComic,
  putComic,
  deleteComic,
};