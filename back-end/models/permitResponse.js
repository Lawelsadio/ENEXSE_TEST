const mongoose = require("mongoose");

const permitResponse = new mongoose.Schema({
  qid: Number,
  question: String,
  options: [String],
  answer: String,
  badge: String,
});

const userResponseSchema = new mongoose.Schema({
  id: Number,
  text: String,
  image: String,
  questions: [permitResponse],
});

const Data = mongoose.model("userAnswer", userResponseSchema);

module.exports = Data;
