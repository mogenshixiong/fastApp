module.exports = function (app) {
    require("./controller.user.js")(app);
    require("./controller.login.js")(app);
    require("./controller.index.js")(app);
    require("./model.user.js");
}