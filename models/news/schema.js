const Schema = require("mongoose").Schema;

const newsSchema = new Schema({
  //id_account: { type: Schema.Types.ObjectId },
  title: { type: String ,required:true},
  description: String,
  status: {type:Number, default: 1}, // 1.hihe, 2.avai,3.unavai
  area: Number, // dien tich
  //location: { longtitude: Number, latitude: Number },
  address: String,
  price: Number,
  //image: { type: Array },
  createDay: { type: Date, default: Date.now }
});

module.exports = newsSchema;