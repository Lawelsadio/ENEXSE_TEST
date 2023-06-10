const express = require("express");
const app = express();
const mongoose = require("mongoose");
const permitAnswerSed = require("../routes/permitAnswerSed.js");
const permitSeed = require("../routes/permitSeed.js");
const permitResponse = require("../routes/permitResponse.js");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

mongoose
  .connect("mongodb://localhost:27017/auto", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/api/v1", permitSeed);
app.use("/api/v1", permitAnswerSed);
app.use("/api/v1", permitResponse);
module.exports = app;
