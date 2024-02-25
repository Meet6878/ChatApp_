const express = require("express");
const {
  addMassage,
  getAllMassage,
} = require("../controllers/massageController");

const massageroute = express.Router();

massageroute.post("/addmassage", addMassage);
massageroute.post("/getmassage", getAllMassage);

module.exports = massageroute;
