const sqlite3 = require("sqlite3").verbose();
let sqliteDbPath = process.cwd()+"/db/base.db";
var db = new sqlite3.Database(sqliteDbPath);//打开数据库链接

async function dbRun(){
    return new Promise((resolve, reject) => {
        //初始化时创建表
        db.run("CREATE TABLE IF NOT EXISTS  sys_user" + "  (" +
        "id TEXT PRIMARY KEY NOT NULL," + 
        "loginName TEXT NOT NULL," + //登录账号
        "password TEXT NOT NULL," + //登录密码
        "name TEXT ," + //姓名
        "nickName TEXT ," + //昵称
        "userGroup TEXT ," + //用户组ID
        "roleId TEXT ," + //角色ID
        "photo TEXT ," + //照片地址
        "sex TEXT ," + //性别
        "idCardNumber TEXT ," + //身份证号码
        "birthday TEXT ," + //生日
        "nation TEXT ," + //民族
        "department TEXT ," + //部门
        "politicCountenance TEXT ," + //政治面貌
        "jobNumber TEXT ," + //工号
        "phone TEXT ," + //手机
        "telephone TEXT ," + //固定电话
        "status TEXT DEFAULT '1'," + // 0禁用 1正常 2锁定
        "loginTimes INT DEFAULT '0'," + // 登录次数
        "email TEXT ," + // 邮箱
        "remarks TEXT ," + //备注
        "entryTime TEXT ," + //入职时间
        "quitTime TEXT ," + //离职时间
        "lastLogin_time date ," + //最后登录时间
        "lastLogout_time date ," + //最后退出登录时间
        "create_time date ," + //创建时间
        "update_time date ," + //最后修改时间
        "field1 TEXT ," +
        "field2 TEXT ," +
        "field3 TEXT ," +
        "field4 TEXT ," +
        "field5 TEXT ," +
        "field6 TEXT " +
        ") ",function(err){
            db.close();
        });
    });
}
dbRun();