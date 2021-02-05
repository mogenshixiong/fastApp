const dbUtils = require("../_base/utils/dbUtils");
const creatSql = "CREATE TABLE IF NOT EXISTS  sys_cmsCategory" + "  (" +
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
  ") ";

global.sqlite3.base.run( creatSql, async function(err){
  if (!err) {
    global.cmsCategory = await dbUtils.findAll('base',"sys_cmsCategory","Order By sort ASC");
  }
});

