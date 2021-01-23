module.exports = function (app) {
    require( './controller.attendance.js')(app);
    require( "./models.signRecord");
}