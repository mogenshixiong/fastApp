var date = require("silly-datetime");

//替换"
function replaceSpecialChar(str){
    str = str.replace(/\"/g, '""');
    return str;
}
//替换SQL的输入字符'
function replaceCharacters(str){
    if( typeof str == "string"){
        var result = str.replace(/'/g, "''");//'字符会影响SQL的语法
        return result;
    }else{
        return str;
    }
}

function createsql_updateById(obj,tableName){
    obj.update_time = date.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    var sql = `update ${tableName} set `;
    for( var key in obj){
        if( key != "id"){
            sql += `${key} = "${replaceSpecialChar(obj[key])}",`
        }
    }
    
    sql = sql.substr(0,sql.length-1); // 去掉最后一个逗号
    sql += `where id = "${obj.id}"`
    return sql;
}

//封装新增Sql
function createsql_add(obj,tableName) {
    var fields = [];
    var values = [];
    for (const key in obj) {
        fields.push(key);
        values.push("'"+replaceCharacters( obj[key] )+"'");
    }
    //insert into user (username, password, email) values('buding', '1111', '221@sdsd.com')
    var addsql = "INSERT INTO " + tableName + "(" +fields.join(",") +") VALUES ("+values.join(",")+")";
    // console.log(addsql);
    return addsql;
}

module.exports.createsql_updateById = createsql_updateById;//生成根据ID进行更新的sql
module.exports.createsql_add = createsql_add;//生成根据ID进行更新的sql