const express = require("express");
const router = express.Router();
const ctrl = require("../controller/series");

router.get("/series", ctrl.list);
router.get("/series/:level", ctrl.getOne);
router.post("/series/:level/responses", ctrl.saveResponse);

module.exports = router;


