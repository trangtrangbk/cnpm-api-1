const router = require("express").Router();

router.post("/login", require("./login"));
router.post("/register", require("./register"));
router.get("/auth",require("./auth"));

module.exports = router;
