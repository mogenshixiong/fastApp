var child = require('child_process');
const exec = require('child_process').execSync;
var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var dbUtils = require("../_base/utils/dbUtils");
var tool = require("../_base/tool/tool");
const md5 = require('md5-node');
const resCode = require('../_base/const/responseCode');
var date = require('../_base/utils/dateUtils');
const dbName = 'base';
module.exports = function (app) {
    // 登录
    app.post('/login', urlencodedParser, async(req, res) => {
        var params = {loginName: req.body.loginName }
        var password = tool.enCodeByMogen(md5(req.body.password + global.publicKey)) //密码二次加密
        var userEntity = await dbUtils.findOne(dbName,"sys_user",params);
        if(userEntity && password == userEntity.password ){
            req.session.data = userEntity; //设置cookie
            userEntity.lastLogin_time = date.getNow(); // 更新最后登录时间
            userEntity.loginTimes = userEntity.userEntity+1; // 更新登录次数
            await dbUtils.updateById(dbName,"sys_user",userEntity);
            res.json({ code: resCode.SUCCESS,msg: "登录成功"});
        }
        else if(userEntity && password != userEntity.password ){
            res.json({ code: resCode.ERROR,msg: "用户名、密码错误"});//密码错误
        }
        else if(req.body.loginName == "admin" && req.body.password == md5("1")){
            req.session.data = {loginName:"admin",id: "1"};
            console.log('欢迎，超级管理员。');
            res.json({ code:resCode.SUCCESS,msg: "欢迎，超级管理员。"});//内置管理员账号
        }
        else{
            res.json({ code: resCode.ERROR ,msg: "用户名、密码错误。"});//未查询到用户
        }
    });

}