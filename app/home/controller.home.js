var child = require('child_process');
const exec = require('child_process').execSync;
var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var dbUtils = require("../_base/utils/dbUtils");
var tool = require("../_base/tool/tool");
const md5 = require('md5-node');
let sqliteDbPath = process.cwd()+"/db/base.db";

module.exports = function (app) {

    app.get('/home', function (req, res) {
        res.render('home/home');
    });
    
}