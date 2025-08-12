const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  qid: Number,
  question: [String],
  options: [String],
});

const ItemSchema = new mongoose.Schema({
  index: Number,
  text: String,
  imageUrl: String,
  questions: [QuestionSchema],
  answers: [String],
  answerText: String,
  a_valider: { type: Boolean, default: false },
});

const SeriesSchema = new mongoose.Schema({
  level: { type: String, unique: true, index: true },
  items: [ItemSchema],
});

module.exports = mongoose.model("SeriesV2", SeriesSchema);


