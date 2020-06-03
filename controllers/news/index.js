const router = require("express").Router();


router.get("/", require("./getAvailableNews"));
router.get("/:id", require("./getNewsById"));
router.post("/postNews", require("./postNews"));

module.exports = {router};