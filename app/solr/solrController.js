var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const sqlite3 = require("sqlite3").verbose();
const uuid = require('node-uuid');
var solr = require('solr-client');
var date = require("silly-datetime");

var tool = require("../_base/tool/tool");
var format = require("../common/format");
var baseConst = require('../const/baseConst');
var sqlUtils = require("../_base/utils/sqlUtils");
var solrUtils = require("../_base/utils/solrUtils");
var dbUtils = require(process.cwd()+"/app/_base/utils/dbUtils");

let sqliteDbPath = process.cwd()+"/db/base.db";
let tableName = "solrClients";

//solr语法
//https://www.cnblogs.com/shaosks/p/8042867.html
module.exports = function (app) {

    app.get('/base/solr/list', function (req, res) {
        res.render('base/solr/list');
    });

    app.get('/base/solr/form', function (req, res) {
        res.render('base/solr/form');
    });

    app.get('/base/solr/manage', function (req, res) {
        res.render('base/solr/manage');
    });

    app.get('/base/solr/form_task', function (req, res) {
        res.render('base/solr/form_task');
    });
    
    //新增solr配置
    app.post('/base/solr/addSolrClient', urlencodedParser, (req, res) => {
        try{
            var db = new sqlite3.Database(sqliteDbPath);
            var timeNow = date.format(new Date(),'YYYY-MM-DD HH:mm:ss');
            var obj = {
                id : uuid.v1(),
                host : req.body.host,
                port : req.body.port,
                core : req.body.core,
                path : req.body.path,
                remarks : req.body.remarks,
                create_time : timeNow,
                update_time : timeNow
            };
    
            var sql = sqlUtils.createsql_add(obj,tableName);//生成新增SQL
            db.run(sql,function(err){
                if(!err){
                    res.json(format.formatReturn({ code: baseConst.SUCCESS}));
                }else{
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });

     //更新solr配置
     app.post('/base/solr/updateSolrClient', urlencodedParser, (req, res) => {
        try{
            var db = new sqlite3.Database(sqliteDbPath);
            var obj = {
                id: req.body.id,
                host : req.body.host,
                port : req.body.port,
                core : req.body.core,
                path : req.body.path,
                remarks : req.body.remarks,
            };
            
            var sql = sqlUtils.createsql_updateById(obj,tableName);

            db.run(sql,function(err){
                if(!err){
                    res.json(format.formatReturn({ code: baseConst.SUCCESS}));
                }else{
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });

    //删除solr配置
    app.post('/base/solr/deleteById', urlencodedParser, (req, res) => {
        try {
            var db = new sqlite3.Database(sqliteDbPath);
            var checksql = `select * from solrTasks where clientId='${req.body.id}'`;
            db.get( checksql, function(checkerr, checkrow) {
                if (!checkerr) {
                    if(checkrow == undefined){
                        var sql = `delete from ${tableName} where id="${req.body.id}"`;
                        db.run(sql,function(err){
                            if(!err){
                                res.json(format.formatReturn({ code: baseConst.SUCCESS}));
                            }else{
                                res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                            }
                        });
                    }else{
                        res.json(format.formatReturn({ 
                            code: baseConst.ERROR,
                            msg: '当前配置下有任务！',
                            data: tool.delete_objList_keys(checkrow,['create_user'])
                        }));
                    }
                }else {
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });

    //查询全部solr配置
    app.post('/base/solr/findAll', urlencodedParser, (req, res) => {
        try {
            var db = new sqlite3.Database(sqliteDbPath);
            db.all(`select * from ${tableName}`, function(err, row) {
                if (!err) {
                    res.json(format.formatReturn({ 
                        code: baseConst.SUCCESS,
                        data: tool.delete_objList_keys(row,['create_user'])
                    }));
                }else {
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });
    //findById
    app.post('/base/solr/findById', urlencodedParser, (req, res) => {
        try {
            var db = new sqlite3.Database(sqliteDbPath);
            var sql = `select * from ${tableName} where id='${req.body.id}'`;
            db.get( sql, function(err, row) {
                if (!err) {
                    res.json(format.formatReturn({ 
                        code: baseConst.SUCCESS,
                        data: tool.delete_obj_keys(row,['create_user'])
                    }));
                }else {
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });

    //分页查询
    app.post('/base/solr/searchByPage', urlencodedParser, (req, res) => {
        try {
            var optin = {
                "host" : req.body.host,
                "port" : req.body.port,
                "core" : req.body.core,
                "path" : req.body.path
            }
            var client = solr.createClient(optin);
            client.search({
                q:req.body.query,
                start:req.body.pageNum-1,
                rows:1
            },function(err,obj){
                if(!err){
                    res.json( format.formatReturn({
                        code : baseConst.SUCCESS,
                        data: obj
                    }));
                }else{
                    res.json( format.formatReturn({
                        code : baseConst.ERROR,
                        msg : err.message,
                        err: err
                    }));
                }
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });

    //=================================↓ 清洗任务 ↓=======================================
    //新增任务 addSolrTask
    app.post('/base/solr/addSolrTask', urlencodedParser, (req, res) => {
        try{
            var db = new sqlite3.Database(sqliteDbPath);
            var timeNow = date.format(new Date(),'YYYY-MM-DD HH:mm:ss');
            
            var solrTaskEntity = tool.getParametersFromRequstBody(["clientId","query","function","taskStatus","cron","remarks"],req);
            solrTaskEntity.id = uuid.v1();
            solrTaskEntity.create_time = timeNow;
            solrTaskEntity.update_time = timeNow;
            
            var sql = sqlUtils.createsql_add(solrTaskEntity,"solrTasks");//生成新增SQL
            db.run(sql,function(err){
                if(!err){
                    res.json(format.formatReturn({ code: baseConst.SUCCESS}));
                }else{
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });

    app.post('/base/solr/findTaskById', urlencodedParser, (req, res) => {
        try {
            var db = new sqlite3.Database(sqliteDbPath);
            var sql = `select * from solrTasks where id='${req.body.id}'`;
            db.get( sql, function(err, row) {
                if (!err) {
                    res.json(format.formatReturn({ 
                        code: baseConst.SUCCESS,
                        data: tool.delete_obj_keys(row,['create_user'])
                    }));
                }else {
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });
    //查询所有任务脚本
    app.post('/base/solr/findAllTaskById', urlencodedParser, (req, res) => {
        try {
            var db = new sqlite3.Database(sqliteDbPath);
            var sql = `select * from solrTasks where clientId='${req.body.id}'`;
            db.all( sql, function(err, row) {
                if (!err) {
                    res.json(format.formatReturn({ 
                        code: baseConst.SUCCESS,
                        data: tool.delete_objList_keys(row,['create_user'])
                    }));
                }else {
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });
    //更新任务
    app.post('/base/solr/updateSolrTask', urlencodedParser, (req, res) => {
        try{
            var solrTaskEntity = tool.getParametersFromRequstBody(["id","clientId","query","function","taskStatus","cron","remarks"],req);

            var db = new sqlite3.Database(sqliteDbPath);
            var sql = sqlUtils.createsql_updateById(solrTaskEntity,"solrTasks");

            db.run(sql,function(err){
                if(!err){
                    res.json(format.formatReturn({ code: baseConst.SUCCESS}));
                }else{
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });
    //删除solr配置
    app.post('/base/solr/deleteSolrTaskById', urlencodedParser, (req, res) => {
        try {
            var db = new sqlite3.Database(sqliteDbPath);
            var sql = `delete from solrTasks where id="${req.body.id}"`;
            db.run(sql,function(err){
                if(!err){
                    res.json(format.formatReturn({ code: baseConst.SUCCESS}));
                }else{
                    res.json(format.formatReturn({ code: baseConst.ERROR,msg: err.message}));
                }
                db.close();
            });
        }catch(e) {
            res.json(format.formatReturn({ code: baseConst.ERROR,msg: e.message}));
        }
    });

    //启动solr清洗任务
    app.post('/base/solr/cleanSolrDataByTaskId', urlencodedParser, async(req, res) => {
        try {
            var solrTaskEntity = await dbUtils.findById(sqliteDbPath,"solrTasks",req.body.id);
            var solrClientEntity = await dbUtils.findById(sqliteDbPath,"solrClients",solrTaskEntity.clientId);
            var option = {
        		"host": solrClientEntity.host,
        		"port": solrClientEntity.port,
        		"core": solrClientEntity.core,
        		"path": solrClientEntity.path
        	};
            solrUtils.clean(solrTaskEntity,option,res);
        }catch(e) {
            var result = format.newResult();
            result.msg = e.message;
            result.code = baseConst.ERROR;
            res.json(result);
        }
    });

    //单条数据执行原子更新
    app.post('/base/solr/saveField', urlencodedParser, async(req, res) => {
        try {
            var id = req.body.id;
            var key = req.body.key;
            var fieldType = req.body.fieldType;
            var value = req.body.value;
            var query = 'id:'+req.body.id;

            var option = {
                "host": req.body.host,
                "port": req.body.port,
                "core": req.body.core,
                "path": req.body.path
            };
            solrUtils.saveField(query, option, res, req);
        }catch(e) {
            var result = format.newResult();
            result.msg = e.message;
            result.code = baseConst.ERROR;
            res.json(result);
        }
    });
}