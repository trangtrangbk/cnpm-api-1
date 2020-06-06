const router = require("express").Router();
//const {requiredLogin} = require("../../middlewares/auth");

router.get("/",require("./getAvailabelPermission"));
router.get("/:id",require("./getPermissionById"));

module.exports={router};