const app = require("express")();
// const {} = require("../controllers/news");

app.use("/test", require("../controllers/test"));

///app.use("/userinfo", require("../controllers/userInfo"));
// app.use("/admin/accounts", require("../controllers/account").adminRouter);
//app.use("/accounts", require("../controllers/account").router);
app.use("/", require("../controllers/auth"));
app.use("/news", require("../controllers/news").router);
// app.use("/admin/news", require("../controllers/news").adminRouter);
// app.use("/photos", require("../controllers/photos"));
// app.use("/admin/statitic", require("../controllers/statitic"));

module.exports = app;
