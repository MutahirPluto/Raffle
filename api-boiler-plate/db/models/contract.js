const mongoose = require("mongoose");
const { Schema } = mongoose;

const contractSchema = new Schema({
  address: String,
});

var contract = mongoose.model("Contract", contractSchema, "Contract");
module.exports = {
  contract,
};
