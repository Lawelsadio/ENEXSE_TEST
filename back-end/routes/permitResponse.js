const express = require("express");
const router = express.Router();
const permitCtrl = require("../controller/permitResponse.js");

router.get("/permits/response", permitCtrl.getAllPermits);
router.get("/permit/response/:id", permitCtrl.getOnePermit);
router.post("/permit/response", permitCtrl.createPermit);
router.put("/permit/response/:id", permitCtrl.modifyPermit);
router.delete("/permit/response/:id", permitCtrl.deletePermit);

module.exports = router;
