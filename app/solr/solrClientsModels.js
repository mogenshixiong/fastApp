const sqlite3 = require("sqlite3").verbose();

let sqliteDbPath = process.cwd()+"/db/base.db";
var db = new sqlite3.Database(sqliteDbPath);//打开数据库链接



async function dbRun(){
    return new Promise((resolve, reject) => {
        db.run("CREATE TABLE IF NOT EXISTS  solrClients" + "  (" +
        "id TEXT PRIMARY KEY NOT NULL," + 
        "host TEXT ," +
        "port INTEGER ," + 
        "core TEXT ," +
        "path TEXT ," +
        "remarks TEXT ," +

        "create_user TEXT ," +
        "create_time date ," +
        "update_time date ," +
        "field1 TEXT ," +
        "field2 TEXT ," +
        "field3 TEXT ," +
        "field4 TEXT ," +
        "field5 TEXT ," +
        "field6 TEXT " +
        ") ");
        db.close();
    });
}
dbRun();