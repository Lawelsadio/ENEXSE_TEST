const PermitSeed = require("../models/permitSeed.js");
const seed = require("../data.js");
var ip = require("ip");
var os = require("os");
const seedData = require("../data.js");

//Determination de l os du client
var type = os.type();
var systm;
switch (type) {
  case "Darwin":
    systm = "MacOS operating system";
    break;
  case "Linux":
    systm = "Linux operating system";
    break;
  case "Windows_NT":
    systm = "windows operating system";
    break;
  default:
    systm = "other operating system";
}
// Formatage de la date pour avoir un timestamp complet
const getFullTimestamp = () => {
  const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
  const d = new Date();
  return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(
    d.getMilliseconds(),
    3
  )}`;
};
// Creation d'un permit
exports.createPermit = (req, res, next) => {
  const v = process.env.npm_package_version;
  const permitObject = req.body;
  const permit = new PermitSeed({
    ...permitObject,
  });
  permit
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// recuperer un permit en fonction de son ID
exports.getOnePermit = (req, res, next) => {
  PermitSeed.findOne({
    _id: req.params.id,
  })
    .then((permit) => {
      res.status(200).json(permit);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Modification d'un permit
exports.modifyPermit = (req, res, next) => {
  const permitObject = req.body;
  const permit = new PermitSeed({
    ...permitObject,
    lastKeepAlive: getFullTimestamp(),
  });
  PermitSeed.updateOne({ _id: req.params.id }, permit)
    .then(() => {
      res.status(201).json({
        message: "PermitSeed updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Suppression d'un permit
exports.deletePermit = (req, res, next) => {
  PermitSeed.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Recuperation de tous les permits
exports.getAllPermits = (req, res, next) => {
  PermitSeed.find()
    .then((permits) => {
      res.status(200).json(permits);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Peuplement de la base de donneés
console.log("seed", seed[0].series);
const seedDB = async (data, Model) => {
  try {
    await Model.deleteMany({}); //Supprime toutes les données existantes
    console.log("Existing data deleted", data);
    await Model.create(data[0].series); // Insère les données seed
    console.log("Seed data added");
  } catch (error) {
    console.error(error);
  }
};

seedDB(seed, PermitSeed);
