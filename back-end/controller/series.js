const Series = require("../models/SeriesV2");

exports.list = async (_req, res) => {
  try {
    const docs = await Series.find({}, { level: 1, items: 1 }).lean();
    const payload = docs.map((d) => ({ level: d.level, count: d.items?.length || 0 }));
    res.json(payload);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const doc = await Series.findOne({ level: req.params.level }).lean();
    if (!doc) return res.status(404).json({ error: "not_found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.saveResponse = async (_req, res) => {
  // À implémenter plus tard: persistance des réponses utilisateur
  res.status(201).json({ ok: true });
};


