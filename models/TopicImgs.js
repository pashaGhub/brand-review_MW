const { Schema, model } = require("mongoose");

const schema = new Schema({
  image: {
    type: String,
  },
  alt: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  imgText: { type: [String, [String]] },
});

module.exports = model("TopicImgs", schema);
