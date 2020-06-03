const mongoose = require("mongoose");

module.exports = mongoose.model("News", require("./schema"));