const sqlite3 = require("sqlite3").verbose();

let sqliteDbPath = process.cwd()+"/db/base.db";
var db = new sqlite3.Database(sqliteDbPath);//打开数据库链接

async function dbRun(){
    return new Promise((resolve, reject) => {
        //!初始化时创建表 = migrations
        db.run("CREATE TABLE IF NOT EXISTS  migrations" + "  (" +
        "id INTEGER PRIMARY KEY NOT NULL," + //主键
        "name TEXT ," + 
        "up TEXT ," + 
        "down TEXT " + 
        ") ");
        db.close();
    });
}
dbRun();