const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    c_id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
    },
  },
  {
    timeStamps: true,
  }
);
const Customer = new mongoose.model("Customer", CustomerSchema);

module.exports = Customer;

// c_id SERIAL PRIMARY KEY,
// name VARCHAR(255),
// email VARCHAR(255),
// balance FLOAT
