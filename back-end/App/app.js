const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const permitAnswerSed = require("../routes/permitAnswerSed.js");
const permitSeed = require("../routes/permitSeed.js");
const permitResponse = require("../routes/permitResponse.js");
const agentRoutes = require("../routes/agent.js");
const seriesRoutes = require("../routes/series.js");

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

// Statique pour les images des séries
app.use("/static", express.static(path.join(__dirname, "..", "public")));

mongoose
  .connect("mongodb://localhost:27017/auto", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Monte d'abord les routes les plus spécifiques pour éviter les collisions avec des patterns génériques
app.use("/api/v1", seriesRoutes);
app.use("/api/v1", agentRoutes);
app.use("/api/v1", permitResponse);
app.use("/api/v1", permitSeed);
app.use("/api/v1", permitAnswerSed);
module.exports = app;
