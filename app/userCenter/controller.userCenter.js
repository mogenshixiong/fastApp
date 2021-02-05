var child = require('child_process');
const exec = require('child_process').execSync;
var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var dbUtils = require("../_base/utils/dbUtils");
var tool = require("../_base/tool/tool");
const md5 = require('md5-node');
let dbName = 'base';

module.exports = function (app) {

    app.get('/userCenter', function (req, res) {
        res.render('base/userCenter/index');
    });
    
    //查询所有用户
    app.post('/base/user/getUserInfo', urlencodedParser, async(req, res) => {
        var userId = req.session.data.id;
        if(userId == "0"){
            res.json({ code: 2 ,msg : "超级管理员无法查看个人中心"});
            res.end();
        }

        var userEntity = await dbUtils.findById(dbName,"sys_user",userId);
        var userConfig = {};//单个用户的设置
        var data = {
            userEntity: userEntity,
            userConfig: userConfig
        }
        res.json({ code: 1 ,data : data});
    });

    //查询所有用户
    app.post('/base/user/findByPage', urlencodedParser, async(req, res) => {
        var param = {
            pageNum:req.body.pageNum ,
            pageSize: req.body.pageSize
        };
        var userList = await dbUtils.findByPage(dbName,"sys_user",param,"Order By create_time DESC");
        userList = tool.delete_objList_keys(userList,["password"]);//过掉密码
        res.json({ code: 1 ,data : userList});
    });
    //查询单用户
    app.post('/base/user/findById', urlencodedParser, async(req, res) => {
        var userEntity = await dbUtils.findById(dbName,"sys_user",req.body.id);
        userEntity.password = "";//过掉密码
        res.json({ code: 1 ,data : userEntity});
    });
    //新增&编辑用户
    app.post('/base/user/saveUser', urlencodedParser, async(req, res) => {
        var obj = req.body;
        if(req.body.id.trim()==""){
            obj.password = tool.enCodeByMogen(md5(obj.password + global.publicKey));//密码二次加密
            await dbUtils.add(dbName,"sys_user",obj);
        }else{
            if(req.body.password.trim()== ""){
                obj = tool.delete_obj_keys(req.body,["password"]);//编辑时，可以不修改密码。
            }else{
                obj.password = tool.enCodeByMogen(md5(obj.password + global.publicKey));//密码二次加密
            }
            await dbUtils.updateById(dbName,"sys_user",obj);
        }
        res.json({ code: 1});
    });
    //删除用户
    app.post('/base/user/deleteById', urlencodedParser, async(req, res) => {
        await dbUtils.deleteById(dbName,"sys_user",req.body.id);
        res.json({ code: 1});
    });
}