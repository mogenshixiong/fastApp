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
async function findById(dbName,tableName,id){
    return new Promise((resolve, reject) => {
        var sql = `select * from ${tableName} where id='${id}'`;
        global.sqlite3[dbName].get( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
        });
    });
}
//参数1：数据库文件路径
//参数2：表名
//参数3：id
async function findOne(dbName,tableName,params){
    return new Promise((resolve, reject) => {
        var query = " 1=1 ";
        for( var key in params){
            query += ` AND ${key} = "${replaceCharacters(params[key])}" `
        }
        var sql = `select * from ${tableName} where ${query} `;
        global.sqlite3[dbName].get( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
        });
    });
}

//参数1：数据库文件路径
//参数2：表名
//参数3：查询条件
async function findByPage(dbName,tableName,param,order){
    return new Promise((resolve, reject) => {
        var query = `1=1`;
        var LIMIT = param.pageSize == undefined ? '1' : param.pageSize;
        var Offset = param.pageNum == undefined ? '10' : (param.pageNum-1)*param.pageSize;
        var sql = `
            select *  from ${tableName} 
            where '${query}' ${order} 
            LIMIT ${LIMIT} Offset ${Offset}
        `;
        global.sqlite3[dbName].all( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
        });
    });
}
async function findAll(dbName,tableName,order){
    return new Promise((resolve, reject) => {
        var query = `1=1`;
        var sql = `
            select *  from ${tableName} 
            where '${query}' ${order} 
        `;
        global.sqlite3[dbName].all( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
        });
    });
}
//参数1：数据库文件路径
//参数2：表名
//参数3：查询条件
async function getCount(dbName,tableName){
    return new Promise((resolve, reject) => {
        var sql = `select count(*) from ${tableName}`;
        global.sqlite3[dbName].get( sql, function(err, row) {
            if (!err) {
                resolve(row['count(*)']);
            }else {
                reject(err);
            }
        });
    });
}
async function add(dbName,tableName,entity){
    return new Promise((resolve, reject) => {
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
        global.sqlite3[dbName].run( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
        });
    });
}
async function updateById(dbName,tableName,entity){
    return new Promise((resolve, reject) => {
        entity.update_time = date.format(new Date(),'YYYY-MM-DD HH:mm:ss');
        var sql = `update ${tableName} set `;
        for( var attribute in entity){
            if( attribute != "id" && entity[attribute]){
                sql += `${attribute} = "${replaceCharacters(entity[attribute])}",`
            }
        }
        sql = sql.substr(0,sql.length-1); // 去掉最后一个逗号
        sql += `where id = "${entity.id}"`
        global.sqlite3[dbName].run( sql, function(err, row) {
            if (!err) {
                resolve(row); }
            else {
                reject(err);
            }
        });
    });
}
async function deleteById(dbName,tableName,id){
    return new Promise((resolve, reject) => {
        var sql = `delete from ${tableName} where id="${id}"`;
        global.sqlite3[dbName].run( sql, function(err, row) {
            if (!err) { 
                resolve(row); 
            }else { 
                reject(err); 
            }
        });
    });
}
async function getArticleList(){
    return new Promise((resolve, reject) => {
        var sql = `
            select id, title, keyword, summary, cover, source, 
                autor, label, category_url, category_type_url, collect_count,
                read_count, start_count, reply_count, sort, status, create_user, create_time, update_time
            from sys_cmsArticle
        `;
        global.sqlite3.base.all( sql, function(err, row) {
            if (!err) {
                resolve(row);
            }else {
                reject(err);
            }
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