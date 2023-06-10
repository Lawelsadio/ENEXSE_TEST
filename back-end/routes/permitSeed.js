const express = require("express");
const router = express.Router();
const permitCtrl = require("../controller/permitSeed.js");

router.get("/permits", permitCtrl.getAllPermits);
router.get("/:id", permitCtrl.getOnePermit);
router.post("/permit", permitCtrl.createPermit);
router.put("/:id", permitCtrl.modifyPermit);
router.delete("/:id", permitCtrl.deletePermit);

module.exports = router;
