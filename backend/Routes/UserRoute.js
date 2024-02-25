const experss = require("express");
const {
  ragiserContoller,
  loginController,
  getAvatarController,
  allUsers,
} = require("../controllers/userControoler");

const route = experss.Router();

route.post("/register", ragiserContoller);
route.post("/login", loginController);
route.post("/setavatar/:id", getAvatarController);
route.get("/allusers/:id", allUsers);

module.exports = route;
