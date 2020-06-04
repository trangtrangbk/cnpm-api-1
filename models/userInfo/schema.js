const Schema = require("mongoose").Schema;

const userInfoSchema = new Schema({
  id_account: { type: Schema.Types.ObjectId, required: true },
  email: { type: String },
  displayName: String,
  birthday: Date,
  address: String,
  gender:Boolean,
  avatar:String,
  phoneNumber:String,
  createdDay: { type: Date, default: Date.now }
});

module.exports = userInfoSchema;
