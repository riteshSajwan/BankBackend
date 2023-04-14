const mongoose = require("mongoose");

const TransferSchema = new mongoose.Schema(
  {
    t_id: {
      type: Number,
      required: true,
    },
    sender: {
      type: String,
      require: true,
    },
    receiver: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Transfer", TransferSchema);
