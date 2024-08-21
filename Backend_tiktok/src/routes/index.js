const siteRoute = require("./siteRoute");
const accoutRoute = require("./accountRoute");
const profileRoute = require("./profileRoute");
const uploadVideoRoute = require("./uploadVideoRoute");
const searchRoute = require("./searchRoute");
function router(app) {
  app.use("/", siteRoute);
  app.use("/account", accoutRoute);
  app.use("/profile", profileRoute);
  app.use("/uploadVideo", uploadVideoRoute);
  app.use("/search", searchRoute);
}
module.exports = router;
