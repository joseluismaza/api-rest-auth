const comicsRouter = require("express").Router();
const { isAdmin, isAuth } = require("../../middlewares/auth");
const { getComicsAdmin, getComicsByPrice, getComicsByCategory, getComicsById, getComics, postComic, putComic, deleteComic } = require("../controllers/comics");


comicsRouter.get("/not-verified", [isAdmin], getComicsAdmin);
comicsRouter.get("/precio/:precio", getComicsByPrice);
comicsRouter.get("/categoria/:categoria", getComicsByCategory);
comicsRouter.get("/:id", getComicsById);
comicsRouter.get("/", getComics);
comicsRouter.post("/", [isAuth], postComic);
comicsRouter.put("/:id", [isAdmin], putComic);
comicsRouter.delete("/:id", [isAdmin], deleteComic);

module.exports = comicsRouter;