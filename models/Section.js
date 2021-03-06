const { Schema, model, Types } = require("mongoose");
const Topic = require("./Topic");

const schema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  order: {
    type: Number,
  },
  title: {
    type: String,
  },
  topics: [Topic.schema],
});

module.exports = model("Section", schema);
