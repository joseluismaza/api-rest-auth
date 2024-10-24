const mongoose = require("mongoose");
const comicsData = require("../data/data");
const Comic = require("../api/models/comics");
const libreriasData = require("../data/data");
const Libreria = require("../api/models/librerias");

mongoose.connect(process.env.DB_URL).then(async () => {
  const allComics = await Comic.find();
  const allLibrerias = await Libreria.find();

  if (allComics.length, allLibrerias.length) {
    await Comic.collection.drop();
    await Libreria.collection.drop();
  }
})
  .catch((error) => console.log(`Error eliminando información: ${error}`)).then(async () => {
    await Comic.insertMany(comicsData);
    await Libreria.insertMany(libreriasData);
  })
  .catch((error) => console.log(`Error creando inforamción: ${error}`)).finally(() => mongoose.disconnect());