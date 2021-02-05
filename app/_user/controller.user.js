var child = require('child_process');
const exec = require('child_process').execSync;
var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var dbUtils = require("../_base/utils/dbUtils");
const tool = require('../_base/tool/tool');
const md5 = require('md5-node');
const resCode = require('../_base/const/responseCode');
let sqliteDbPath = process.cwd()+"/db/base.db";//打包后数据库文件挂载在包外
const dbName = 'base';

module.exports = function (app) {

    //查询所有用户
    app.post('/findUserByPage', urlencodedParser, async(req, res) => {
        var param = {
            pageNum:req.body.page ,
            pageSize: req.body.limit
        };
        var userList = await dbUtils.findByPage(dbName,"sys_user",param,"Order By create_time DESC");
        userList = tool.delete_objList_keys(userList,["password"]);//过掉密码
        var count = await dbUtils.getCount(dbName,"sys_user");
        res.json({
            code: resCode.SUCCESS ,
            data: userList,
            count: count,
            msg: '查询成功'
        });
    });
    //查询单用户
    app.post('/findUserById', urlencodedParser, async(req, res) => {
        var userEntity = await dbUtils.findById(dbName,"sys_user",req.body.id);
        res.json({ code: 1 ,data : userEntity});
    });
    //新增&编辑用户
    app.post('/saveUser', urlencodedParser, async(req, res) => {
        var obj = req.body;
        if( req.body.id === undefined ||  req.body.id.trim() == "" ){
            obj.password = tool.enCodeByMogen(md5(obj.password + global.publicKey));//密码二次加密
            await dbUtils.add(dbName,"sys_user",obj);
        }else{
            if( req.body.password.trim() == ""){
                obj = tool.delete_obj_keys(req.body,["password"]);//编辑时，可以不修改密码。
            }else{
                obj.password = tool.enCodeByMogen(md5(obj.password + global.publicKey));//密码二次加密
            }
            await dbUtils.updateById(dbName,"sys_user",obj);
        }
        res.json({ code: 1});
    });
    //删除用户
    app.post('/deleteUserById', urlencodedParser, async(req, res) => {
        await dbUtils.deleteById(dbName,"sys_user",req.body.id);
        res.json({ code: 1});
    });
}