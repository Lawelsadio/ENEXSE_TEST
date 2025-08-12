const express = require("express");
const router = express.Router();
const ctrl = require("../controller/agent");

// Harmonisation RESTful: /api/v1/agents
router.get("/agents", ctrl.list);
router.post("/agents", ctrl.create);
router.get("/agents/:id", ctrl.getOne);
router.put("/agents/:id", ctrl.update);
router.delete("/agents/:id", ctrl.remove);

module.exports = router;


