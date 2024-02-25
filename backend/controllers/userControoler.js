const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const ragiserContoller = async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "enter your name",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "enter your email",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "enter your password",
      });
    }
    if (!cpassword) {
      return res.status(400).send({
        success: false,
        message: "enter your cpassword",
      });
    }
    if (password !== cpassword) {
      return res.status(400).send({
        success: false,
        message: "password and confirm password do not match",
      });
    }
    const alreadyExit = await userModel.findOne({ email });

    if (alreadyExit) {
      return res.status(400).send({
        success: false,
        message: "user already exists",
      });
    }
    //   const newUser = new UserModel(req.body);
    //   await newUser.save();
    else {
      const newUsers = await userModel.create(req.body);
      return res.status(200).send({
        newUsers,
        success: true,
        message: "user registered successfully",
      });
    }
  } catch (error) {
    console.log("faild", error);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (email && password === "") {
    return res.status(401).send({
      success: false,
      message: "Please valid email or password",
    });
  }
  const checkUser = await userModel.findOne({ email });
  if (!checkUser) {
    return res.status(401).send({
      success: false,
      message: "please enter  valid email or password",
    });
  }
  const comparePass = await bcrypt.compare(password, checkUser.password);
  if (!comparePass) {
    return res.status(401).send({
      success: false,
      message: "Please valied email or password",
    });
  }
  return res.status(200).send({
    success: true,
    message: "Login successful",
    checkUser,
  });
};

const getAvatarController = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await userModel.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.status(200).send({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    console.error("Error fetching avatars:", error);
    //res.status(500).json({ error: "Failed to fetch avatars" });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ _id: { $ne: req.params.id } })
      .select(["_id", "name", "email", "avatarImage"]);
    return res.status(200).send(users);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

module.exports = {
  ragiserContoller,
  loginController,
  getAvatarController,
  allUsers,
};
