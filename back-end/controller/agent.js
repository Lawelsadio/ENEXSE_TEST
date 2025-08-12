const Agent = require("../models/Agent");
const os = require("os");
const ip = require("ip");

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

exports.create = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      os: os.type(),
      ip: ip.address(),
      dateAdd: getFullTimestamp(),
      version: process.env.npm_package_version,
    };
    const doc = await Agent.create(payload);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.list = async (_req, res) => {
  try {
    const docs = await Agent.find().lean();
    res.json(docs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const doc = await Agent.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: "not_found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const update = { ...req.body };
    const doc = await Agent.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    }).lean();
    if (!doc) return res.status(404).json({ error: "not_found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


