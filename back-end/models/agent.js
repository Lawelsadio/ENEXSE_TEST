const mongoose = require('mongoose');

const agentSchema = mongoose.Schema({
    os: { type: String, required: true },
    lastKeepAlive: { type: String },
    dateAdd: { type: String, required: true },
    ip: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true },
    version: { type: String, required: true },
    status: {// aucun status different de ceux dans l'enum ne seront accepter dans la base de donneés
        type: String,
        enum: ['active', 'disconnected','pending','never_connected'],
        default: 'never_connected'
      }
});

module.exports = mongoose.model('Agent', agentSchema);