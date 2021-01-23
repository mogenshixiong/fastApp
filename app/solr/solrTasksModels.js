const sqlite3 = require("sqlite3").verbose();
var sqlUtils = require("../_base/utils/sqlUtils");

let sqliteDbPath = process.cwd()+"/db/base.db";
var db = new sqlite3.Database(sqliteDbPath);//打开数据库链接



async function dbRun(){
    return new Promise((resolve, reject) => {
        
        //!初始化时创建表
        db.run("CREATE TABLE IF NOT EXISTS  solrTasks" + "  (" +
        "id TEXT PRIMARY KEY NOT NULL," + 
        "clientId TEXT NOT NULL," + // 关联solr配置ID

        "query TEXT ," + //solr查询条件 
        "querySort TEXT ," + //solr查询排序条件

        "function TEXT ," + //清洗规则

        "taskStatus TEXT DEFAULT '0'," + //定时任务状态 0 关闭 1开启
        "cron TEXT ," + // 定时任务表达式

        "remarks TEXT ," + //备注
        "status TEXT DEFAULT '0'," + // 启动工作状态 0未启动 1启动中
        "doCount INTEGER DEFAULT '0'," + //任务总计执行次数

        "create_user TEXT ," +
        "create_time date ," +
        "update_time date ," +
        "field1 TEXT ," +
        "field2 TEXT ," +
        "field3 TEXT ," +
        "field4 TEXT ," +
        "field5 TEXT ," +
        "field6 TEXT " +
        ") ",function(err){
            //系统启动时，需要把所有记录的运行状态修改为 待启动。
            //防止系统崩溃、强制停止任务等造成的异常数据。
            db.run(`update solrTasks set status='0'`);
            db.close();
        });

        //一次性执行时，只取ID。这样一次可以处理更多数据。可以测试一下  一次性取10万ID会小号多少内存。
        //单次执行数据最大量实测260多万
        //设置最大数量，否则会内存溢出。超出的话建议使用定时任务，用户自己使用状态位判断。
    });
}
dbRun();