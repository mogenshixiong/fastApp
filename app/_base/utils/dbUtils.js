const sqlite3 = require("sqlite3").verbose();
//根据项目需要，可修改为其他数据库
const uuid = require('node-uuid');
var date = require("silly-datetime");
//替换SQL的输入字符'
function replaceCharacters(str){
    if( typeof str == "string"){
        var result = str.replace(/'/g, "''");//'字符会影响SQL的语法
        result = str.replace(/\"/g, '""');//'字符会影响SQL的语法
        return result;
    }else{
        return str;
    }
}

//参数1：数据库文件路径
//参数2：表名
//参数3：id
async function findById(sqliteDbPath,tableName,id){
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var sql = `select * from ${tableName} where id='${id}'`;
        db.get( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
            db.close();
        });
    });
}
//参数1：数据库文件路径
//参数2：表名
//参数3：id
async function findOne(sqliteDbPath,tableName,params){
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var query = " 1=1 ";
        for( var key in params){
            query += ` AND ${key} = "${replaceCharacters(params[key])}" `
        }
        var sql = `select * from ${tableName} where ${query} `;
        db.get( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
            db.close();
        });
    });
}

//参数1：数据库文件路径
//参数2：表名
//参数3：查询条件
async function findByPage(sqliteDbPath,tableName,param,order){
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var query = `1=1`;
        var LIMIT = param.pageSize == undefined ? '1' : param.pageSize;
        var Offset = param.pageNum == undefined ? '10' : (param.pageNum-1)*param.pageSize;
        var sql = `
            select *  from ${tableName} 
            where '${query}' ${order} 
            LIMIT ${LIMIT} Offset ${Offset}
        `;
        db.all( sql, function(err, row) {
            if (!err) {resolve(row);
            }else {reject(err);}
            db.close();
        });
    });
}
async function findAll(sqliteDbPath,tableName,order){
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var query = `1=1`;
        var sql = `
            select *  from ${tableName} 
            where '${query}' ${order} 
        `;
        db.all( sql, function(err, row) {
            if (!err) {resolve(row);
            }else {reject(err);}
            db.close();
        });
    });
}
//参数1：数据库文件路径
//参数2：表名
//参数3：查询条件
async function getCount(sqliteDbPath,tableName){
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var sql = `select count(*) from ${tableName}`;
        db.get( sql, function(err, row) {
            if (!err) {
                resolve(row['count(*)']);
            }else {
                reject(err);
            }
            db.close();
        });
    });
}
async function add(sqliteDbPath,tableName,entity){
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(sqliteDbPath);
        entity.id = uuid.v1();
        entity.create_time =  date.format(new Date(),'YYYY-MM-DD HH:mm:ss');
        entity.update_time =  date.format(new Date(),'YYYY-MM-DD HH:mm:ss');
        var fields = [];
        var values = [];
        for (const attribute in entity) {
            fields.push(attribute);
            values.push("'"+replaceCharacters( entity[attribute] )+"'");
        }
        var sql = "INSERT INTO " + tableName + "(" +fields.join(",") +") VALUES ("+values.join(",")+")";
        db.run( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
            db.close();
        });
    });
}
async function updateById(sqliteDbPath,tableName,entity){
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(sqliteDbPath);
        entity.update_time = date.format(new Date(),'YYYY-MM-DD HH:mm:ss');
        var sql = `update ${tableName} set `;
        for( var attribute in entity){
            if( attribute != "id" && entity[attribute]){
                sql += `${attribute} = "${replaceCharacters(entity[attribute])}",`
            }
        }
        sql = sql.substr(0,sql.length-1); // 去掉最后一个逗号
        sql += `where id = "${entity.id}"`
        db.run( sql, function(err, row) {
            if (!err) {
                resolve(row); }
            else {
                reject(err);
            }
            db.close();
        });
    });
}
async function deleteById(sqliteDbPath,tableName,id){
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(sqliteDbPath);
        var sql = `delete from ${tableName} where id="${id}"`;
        db.run( sql, function(err, row) {
            if (!err) { resolve(row); }
            else { reject(err); }
            db.close();
        });
    });
}
async function getArticleList(){
    return new Promise((resolve, reject) => {
        let sqliteDbPath = process.cwd()+"/db/base.db";
        var db = new sqlite3.Database(sqliteDbPath);
        var sql = `
            select id, title, keyword, summary, cover, source, 
                autor, label, category_url, category_type_url, collect_count,
                read_count, start_count, reply_count, sort, status, create_user, create_time, update_time
            from sys_cmsArticle
        `;
        db.all( sql, function(err, row) {
            if (!err) {resolve(row);
            }else {reject(err);}
        });
    });
}
module.exports.deleteById = deleteById;
module.exports.updateById = updateById;
module.exports.add = add;
module.exports.findByPage = findByPage;
module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findOne = findOne;
module.exports.getCount = getCount;
module.exports.getArticleList = getArticleList;