module.exports = function (app) {
    require("./model.cmsNav.js");
    require("./controller.cmsNav.js")(app);

    require("./model.cmsCarouse.js");
    require("./controller.cmsCarouse.js")(app);

    require("./model.cmsCategory.js");
    require("./controller.cmsCategory.js")(app);

    require("./model.cmsCategoryType.js");
    require("./controller.cmsCategoryType.js")(app);

    require("./model.cmsArticle.js");
    require("./controller.cmsArticle.js")(app);
}