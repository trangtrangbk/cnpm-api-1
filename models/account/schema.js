const Schema = require("mongoose").Schema;

const accountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash_password: {
    type: String,
    required: true
  },
  salt_password: {
    type: String,
    required: true
  },
  status: { type: Boolean, default: true },
  role: {type:Array , default:["user"]},
  createdDay: { type: Date, default: Date.now }
});

module.exports = accountSchema;
