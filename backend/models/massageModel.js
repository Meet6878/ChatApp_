const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema(
  {
    massage: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const MassageModel = mongoose.model("Massage", massageSchema);

module.exports = MassageModel;
