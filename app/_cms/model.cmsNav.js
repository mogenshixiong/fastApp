const { start } = require("pm2");

const sqlite3 = require("sqlite3").verbose();
let sqliteDbPath = process.cwd()+"/db/base.db";
var db = new sqlite3.Database(sqliteDbPath);//打开数据库链接
const dbUtils = require("../_base/utils/dbUtils");

async function dbRun(){
    return new Promise((resolve, reject) => {
        //初始化时创建表
        db.run("CREATE TABLE IF NOT EXISTS  sys_cmsNav" + "  (" +
        "id TEXT PRIMARY KEY NOT NULL," + 
        "name TEXT NOT NULL," + //名称
        "url TEXT NOT NULL," + //url
        "sort INTEGER ," + //排序
        "status TEXT DEFAULT '1'," + // 0禁用 1正常 2锁定
        "remarks TEXT ," + //备注
        "create_user TEXT ," + //创建人
        "create_time date ," + //创建时间
        "update_time date ," + //最后修改时间
        "field1 TEXT ," +
        "field2 TEXT ," +
        "field3 TEXT ," +
        "field4 TEXT ," +
        "field5 TEXT ," +
        "field6 TEXT " +
        ") ", async function(err){
            if (!err) {
                global.cmaNavs = await dbUtils.findAll(sqliteDbPath,"sys_cmsNav","Order By sort ASC");
                console.log('cms导航加载完成！（'+cmaNavs.length+'）');
            }
            db.close();
        });
    });
}

dbRun();

