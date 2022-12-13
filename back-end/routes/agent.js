const express = require('express');
const router = express.Router();
const agentCtrl = require('../controller/agent');

router.get('/agents', agentCtrl.getAllAgents);
router.get("/:id", agentCtrl.getOneAgent);
router.post('/agent', agentCtrl.createAgent);
router.put('/:id', agentCtrl.modifyAgent);
router.delete('/:id', agentCtrl.deleteAgent);

module.exports = router;