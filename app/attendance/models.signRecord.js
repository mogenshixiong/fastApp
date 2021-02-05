
//!初始化时创建表
global.sqlite3.attendance.run("CREATE TABLE IF NOT EXISTS  signRecord " + "  (" +
    "id TEXT PRIMARY KEY NOT NULL," + 
    "sign_time date ," + //打卡时间
    "sign_time_year INTEGER ," + 
    "sign_time_month INTEGER ," +
    "sign_time_day INTEGER ," +

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