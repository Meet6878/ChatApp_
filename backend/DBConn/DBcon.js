const mongoose = require("mongoose");

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connect to database successfully");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = DBconnect;
