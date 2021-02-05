
var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require("sqlite3").verbose();
var date = require("silly-datetime");
const uuid = require('node-uuid');
var multer = require('multer');
var path = require('path');
var fs = require("fs");
var UUID = require('uuid');

let sqliteDbPath = process.cwd()+"/db/user.db";
const base = require('../_base/utils/base');
const log = require('../_base/utils/logUtils');
// 下面的范例计划 MyApp 程序在每天的 8:00 A.M. 运行一次，
// 直到 2001 年 12 月 31 日结束。由于它忽略了/mo参数，所以使用默认间隔 1 来每天运行命令。
//https://www.cnblogs.com/weilianguang/p/13172409.html  
// var sss = 'schtasks /create /tn "My App" /tr %windir%\system32\notepad.exe /sc daily /st 08:00:00 /ed 2021/12/31';
// var delsss = 'SCHTASKS /Delete /tn "My App"'; //删除任务，需要确认？
// 每天22：20关闭网易云音乐：
// schtasks /create /tn "CloseCloudMusic" /tr "taskkill /f /im cloudmusic.exe" /sc daily /st 22:20:00 /ru "system"

module.exports = function (app) {
    
    //!新增待办
    app.post('/addToDo', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var obj = {
            id : uuid.v1(),
            content : req.body.content,
            sort : Date.now(), //排序 自增
            status : 0, //状态
            create_time : date.format(new Date(),'YYYY-MM-DD HH:mm:ss') //创建时间 
        };

        var sql = base.createsql_add(obj,"todo");//生成新增SQL
        db.run(sql,function(err){
            if(!err){
                res.json({ code: 1});
            }else{
                log.writeErrorLog(err);
            }
            db.close();
        });
    });

    //!查询所有待办
    app.post('/findAllTodo', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        db.all("select * from todo where 1=1 order by sort desc", function(err, row) {
            if (err) {
                res.json({ code: 0});
                log.writeErrorLog(err);
            }else {
                res.json({ code: 1 ,data : row});
            }
            db.close();
        });
    });

    //!修改排序
    app.post('/updateTodos', urlencodedParser, (req, res) => {
        var list = JSON.parse(req.body.list);
        var db = new sqlite3.Database(sqliteDbPath);

        for(var i=0;i<list.length;i++){
            var sql = 'update todo set sort="'+list[i].newsort+'" where id="'+list[i].id+'"';
            db.run(sql,function(err){
                if(err){
                    log.writeErrorLog(err);
                }
            });
        }

        res.json({ code: 1});
        db.close();
        
    });

    //!删除
    app.post('/delByTodoId', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var sql = 'delete from todo where id="'+ req.body.id +'"';
        db.run(sql,function(err){
            if(!err){
                res.json({ code: 1});
            }else{
                log.writeErrorLog(err);
            }
            db.close();
        });
    });

    //!编辑
    app.post('/updateTodo', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var sql = 'update todo set content="'+req.body.content+'" where id="'+req.body.id+'"';
        db.run(sql,function(err){
            if(!err){
                res.json({ code: 1});
            }else{
                log.writeErrorLog(err);
            }
            db.close();
        });
    });

    //!finishTodoId
    app.post('/finishTodoId', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var sql = 'update todo set status='+req.body.status+' where id="'+req.body.id+'"';
        db.run(sql,function(err){
            if(!err){
                res.json({ code: 1});
            }else{
                log.writeErrorLog(err);
            }
            db.close();
        });
    });


}
