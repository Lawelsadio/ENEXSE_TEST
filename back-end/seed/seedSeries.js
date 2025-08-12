const mongoose = require("mongoose");
const Series = require("../models/SeriesV2");
const data = require("./series.data.json");

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auto", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Series.deleteMany({});
    await Series.insertMany(data);
    console.log("Series seed OK");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();


