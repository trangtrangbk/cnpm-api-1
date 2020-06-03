const adminRouter = require("express").Router();
const router = require("express").Router();
const { requiredAdmin, requiredLogin } = require("../../middlewares/auth");

adminRouter.put("/", requiredAdmin, require("./blockAccount"));
adminRouter.get("/", requiredAdmin, require("./getListUser"));
adminRouter.patch("/", requiredLogin, require("./changePasswordForAdmin"));
adminRouter.patch("/:id", requiredLogin, require("./changeRole"));

router.patch("/", requiredLogin, require("./changePassword"));

module.exports = { adminRouter, router };
