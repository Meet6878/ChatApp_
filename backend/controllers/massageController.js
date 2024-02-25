const massageModel = require("../models/massageModel");

exports.addMassage = async (req, res) => {
  try {
    const { from, to, massage } = req.body;
    const data = await massageModel.create({
      massage: { text: massage },
      users: [from, to],
      sender: from,
    });
    if (data) {
      res.status(200).send({ msg: "massage send success" });
    } else {
      res.status(400).send({ msg: "failed to send massage" });
    }
  } catch (error) {
    console.log("error while send massage", error);
  }
};
exports.getAllMassage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const massages = await massageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updateAt: 1 });

    const projectMassages = massages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        massage: msg.massage.text,
      };
    });
    return res.status(200).send(projectMassages);
  } catch (error) {
    console.log("error while getting allMassage", error);
  }
};
