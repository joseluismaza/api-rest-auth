const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log("La base de datos ha caído");
  }
}

module.exports = { connectDB };