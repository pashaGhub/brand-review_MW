const { Schema, model, Types } = require("mongoose");
const TopicImgs = require("./TopicImgs");

const schema = new Schema({
  layout: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  topicVideo: {
    type: String,
  },
  topicImgs: [TopicImgs.schema],
});

module.exports = model("Topic", schema);
