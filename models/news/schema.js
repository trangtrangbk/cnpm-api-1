const Schema = require("mongoose").Schema;

const newsSchema = new Schema({
  id_account: { type: String ,required:true },
  title: { type: String ,required:true},
  description: String,
  status: {type:Boolean, default: false}, 
  area: Number,
  //location: { longtitude: Number, latitude: Number },
  address: String,
  price: Number,
  phone: String,
  picture:String,
  createDay: { type: Date, default: Date.now }
});

module.exports = newsSchema;