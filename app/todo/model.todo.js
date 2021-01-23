const sqlite3 = require("sqlite3").verbose();

let sqliteDbPath = process.cwd()+"/db/user.db";
var db = new sqlite3.Database(sqliteDbPath);//打开数据库链接

async function dbRun(){
    return new Promise((resolve, reject) => {
        //!初始化时创建表 = todo。
        db.run("CREATE TABLE IF NOT EXISTS  todo" + "  (" +
        "id TEXT PRIMARY KEY NOT NULL," + //主键
        "sort INTEGER ," + //排序
        "content TEXT ," + //待办内容
        "remind_time date ," + //提醒时间
        "reminder_frequency INTEGER ," + //提醒频率 0仅一次 1每天
        "status INTEGER ," + //状态 0 未完成 1完成
        "create_time date ," + //创建时间
        "last_use_time date ," + //最后使用时间
        "field1 TEXT ," + //冗余字段
        "field2 TEXT ," + //冗余字段
        "field3 TEXT ," + //冗余字段
        "field4 TEXT ," + //冗余字段
        "field5 TEXT ," + //冗余字段
        "field6 TEXT " + //冗余字段
        ") ");
        db.close();
    });
}
dbRun();