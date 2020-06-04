const mongoose = require("mongoose");
const newsSchema =  require("./schema")

module.exports = mongoose.model("News", newsSchema);