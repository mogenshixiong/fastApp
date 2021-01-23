const sqlite3 = require("sqlite3").verbose();

// sqlites数据库地址
let sqliteDbPath = process.cwd()+"/db/user.db";
var db = new sqlite3.Database(sqliteDbPath);

async function dbRun(){
    return new Promise((resolve, reject) => {
        //!创建数据库，并创建表。
        db.run("CREATE TABLE IF NOT EXISTS  computerApp" + "  (" +
        "id TEXT PRIMARY KEY NOT NULL," + //主键
        "path TEXT ," + //应用程序路径
        "shortcut_key TEXT ," + //自定义快捷键
        "name TEXT ," + //名称
        "icon TEXT ," + //图标
        "sort INTEGER ," + //排序
        "count INTEGER ," + //使用次数
        "create_time date ," + //创建时间
        "last_use_time date ," + //最后使用时间
        "field1 TEXT ," + //冗余字段
        "field2 TEXT ," + //冗余字段
        "field3 TEXT ," + //冗余字段
        "field4 TEXT ," + //冗余字段
        "field5 TEXT ," + //冗余字段
        "field6 TEXT " + //冗余字段
        ") ");

        //! 增加列sql
        // db.run("ALTER TABLE computerApp ADD COLUMN field1 TEXT");
        // db.run("ALTER TABLE computerApp ADD COLUMN field2 TEXT");
        // db.run("ALTER TABLE computerApp ADD COLUMN field3 TEXT");
        // db.run("ALTER TABLE computerApp ADD COLUMN field4 TEXT");
        // db.run("ALTER TABLE computerApp ADD COLUMN field5 TEXT");
        // db.run("ALTER TABLE computerApp ADD COLUMN field6 TEXT");
        db.close();
    });
}
dbRun();