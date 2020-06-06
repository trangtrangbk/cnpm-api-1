const Schema = require("mongoose").Schema;

const userInfoSchema = new Schema({
  id_account: { type: Schema.Types.ObjectId, required: true },
  email: { type: String },
  displayName: String,
  birthday: Date,
  address: String,
  identityCard: String,
  gender:Boolean,
  avatar:String,
  phoneNumber:String,
  favourite:{type:Array},
  createdDay: { type: Date, default: Date.now }
});

module.exports = userInfoSchema;
