const router = require("express").Router();
const { requiredLogin ,requiredAdmin } = require("../../middlewares/auth");

router.get("/", require("./getAvailableNews"));
router.get("/:id", require("./getNewsById"));
router.post("/postNews",requiredLogin, require("./postNews"));

module.exports = {router};