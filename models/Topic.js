const { Schema, model } = require("mongoose");
const TopicImgs = require("./TopicImgs");

const schema = new Schema({
  _id: {
    type: String,
  },
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
