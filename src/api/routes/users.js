const { isAuth, isAdmin } = require("../../middlewares/auth");
const { register, login, deleteUser, getUser, updateUser } = require("../controllers/users");
const usersRoutes = require("express").Router();

usersRoutes.get("/", [isAuth], getUser);
usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.delete("/:id", [isAuth], deleteUser);
usersRoutes.put("/:id", [isAuth, isAdmin], updateUser);


module.exports = usersRoutes;