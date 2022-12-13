const Agent = require('../models/agent');
const seed = require('../data');
var ip = require('ip');
var os = require('os');

//Determination de l os du client
var type = os.type();
var systm;
switch(type) {
    case 'Darwin':
        systm = "MacOS operating system"
        break;
    case 'Linux': 
        systm = "Linux operating system"
        break;
    case 'Windows_NT':
        systm = "windows operating system"
        break;    
    default: 
        systm = "other operating system"
}
// Formatage de la date pour avoir un timestamp complet
const getFullTimestamp = ()=> {
    const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();
    return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(),3)}`;
  }
// Creation d'un agent
exports.createAgent = (req, res, next) => {
    const v = process.env.npm_package_version;
    const agentObject = req.body;
    const agent = new Agent({
        ...agentObject,
        ip: ip.address(), 
        dateAdd: getFullTimestamp(), 
        version: v , 
        os: systm
    });
    agent.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
    };

    // recuperer un agent en fonction de son ID
exports.getOneAgent = (req, res, next) => {
  Agent.findOne({
    _id: req.params.id,
  })
    .then((agent) => {
      res.status(200).json(agent);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Modification d'un agent
exports.modifyAgent = (req, res, next) => {
    const agentObject = req.body;
    const agent = new Agent({
      ...agentObject, 
      lastKeepAlive: getFullTimestamp()
    });
    Agent.updateOne({_id: req.params.id}, agent).then(
      () => {
        res.status(201).json({
          message: 'Agent updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
  // Suppression d'un agent
  exports.deleteAgent = (req, res, next) => {
    Agent.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
  // Recuperation de tous les agents
  exports.getAllAgents = (req, res, next) => {
    Agent.find().then(
      (agents) => {
        res.status(200).json(agents);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
// Peuplement de la base de donneés
    const seedDB = async() => {
    await Agent.deleteMany({});
    await Agent.insertMany(seed);
  };
  seedDB();
  
  
  
  