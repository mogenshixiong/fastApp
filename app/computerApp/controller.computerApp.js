
var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// const open = require('open');

const sqlite3 = require("sqlite3").verbose();
var date = require("silly-datetime");
const uuid = require('node-uuid');
var multer = require('multer');
var path = require('path');
var fs = require("fs");
// var UUID = require('uuid');

let sqliteDbPath = process.cwd()+"/db/user.db";
const base = require('../_base/utils/base');
const log = require('../_base/utils/logUtils');

var upload = multer({ //上传图标文件配置
    storage: multer.diskStorage({
        destination: path.join(process.cwd(),'./file/upload/appIcons'), //存储路径
        filename: function (req, file, cb) { //设置临时文件名称
            let extName = file.originalname.slice(file.originalname.lastIndexOf('.'))
            let fileName = uuid.v1();
            cb(null, fileName + extName);
        }
    }),
    fileFilter: function (req, file, cb) { //设置过来规则
        //https://www.w3school.com.cn/media/media_mimeref.asp
        var acceptableMime = ['image/x-icon','image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/jfif','image/svg+xml'];//支持文件类型
        if (acceptableMime.indexOf(file.mimetype) !== -1) {
            cb(null, true) //允许上传
        } else {
            // cb(null, false) //不允许上传
            cb(null, true) //允许上传
        }
    },
    limits: {
        fieldSize: '2MB' //最大上传限制
    }
}).single('uploadPathFile', 1);  //最大数量限制 表单name属性

module.exports = function (app) {
    //提交/编辑表单页面跳转
    app.get('/_layer_addComputerApp', function (req, res) {
        res.render('base/setting/_layer_addComputerApp');
    });

    //上传图标
    app.post('/uploadAppIcon', upload, (req, res) => {
        // console.log(req);
        if (req.file) {
            //console.log(req.file);
            //console.log(req.file.path);
            fs.readFile(req.file.path, async (err, data) => {
                console.log(data);
                console.log(req.file);
                res.json({ 
                    code: 1,
                    path: "file"+req.file.path.split("file")[1],
                    filename: req.file.filename
                });//上传成功
            });
        } else {
            res.json({ code: 0 });//上传失败
        }
    });

    //!根据快捷键打开应用
    app.post('/openComputerAppByShortcutKey', urlencodedParser, async (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        
        db.get("select path from computerApp where shortcut_key like'"+ req.body.shortcut_key+"%' ORDER BY sort ASC", function(err, row) {
            if (err) {
                res.json({ code: 0});
                log.writeErrorLog(err);
            }else {
                if(row){
                    (async () => {
                        //await open(row.path);
                        base.open(url);
                        res.json({ code: 1});
                    })();
                }else{
                    res.json({ code: 0});
                }
            }
            db.close();
        });
    });

    //!新增应用程序
    app.post('/addComputerApp', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var obj = {
            id : uuid.v1(),
            name : req.body.name,
            path : req.body.path,
            shortcut_key : req.body.shortcutKey, //快捷键
            count:0,
            icon : req.body.icon,
            sort : Number(req.body.sort), //排序
            create_time : date.format(new Date(),'YYYY-MM-DD HH:mm:ss'), //创建时间 
            last_use_time : date.format(new Date(),'YYYY-MM-DD HH:mm:ss') //最后使用时间
        };

        var sql = base.createsql_add(obj,"computerApp");//生成新增SQL
        db.run(sql,function(err){
            if(!err){
                res.json({ code: 1});
            }else{
                log.writeErrorLog(err);
            }
            db.close();
        });
    });

    //!查询所有应用程序
    app.post('/findAllComputerApp', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        db.all("select * from computerApp where 1=1 order by sort asc", function(err, row) {
            if (err) {
                res.json({ code: 0});
                log.writeErrorLog(err);
            }else {
                res.json({ code: 1 ,data : row});
            }
            db.close();
        });
    });

    //!删除
    app.post('/delByComputerAppId', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var sql = 'delete from computerApp where id="'+ req.body.id +'"';
        db.run(sql,function(err){
            if(!err){
                res.json({ code: 1});
            }else{
                log.writeErrorLog(err);
            }
            db.close();
        });
    });

    //!findById
    app.post('/findByComputerAppId', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);
        db.get("select * from computerApp where id='"+ req.body.id+"'", function(err, row) {
            if (err) {
                res.json({ code: 0});
                log.writeErrorLog(err);
            }else {
                res.json({ code: 1 ,data : row});
            }
            db.close();
        });
    });

    //!编辑
    app.post('/updateComputerApp', urlencodedParser, (req, res) => {
        var db = new sqlite3.Database(sqliteDbPath);

        var sql = 'update computerApp set name="'+req.body.name+'" ,icon = "'+req.body.icon+'" ,path="'+req.body.path 
            +'" ,shortcut_key="'+req.body.shortcut_key+'" ,sort="'
            +req.body.sort+'" where id="'+req.body.id+'"';
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
