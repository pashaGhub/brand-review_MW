const { Schema, model, Types } = require("mongoose");
const Section = require("./Section");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  sections: [
    {
      type: Types.ObjectId,
      ref: "Section",
    },
  ],
});

module.exports = model("User", schema);
