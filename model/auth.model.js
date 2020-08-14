const mongoose = require("mongoose");

let authSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  clean_pass: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  secret: {
    type: String
  }
});

module.exports = mongoose.model("User", authSchema);
