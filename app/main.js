module.exports = function (app) {
  require( './_base/const/globalVariable' ); // 初始化定义全局变量，方便统一管理
  
  require( "./_base/index_base")(app);// 加载核心配置
  require( "../config/userConfig.js")(app); //用户设置 //!此处应该优化为存储数据库。多用户
  require( "./_base/pages/pages")(app);

  require( "../app/_user/route.user.js")(app); //加载用户模块
  require( "../app/_cms/route.cms.js")(app); //加载cms内容管理模块
  require( "../app/_mycomputer/route.mycomputer.js")(app); //加载我的电脑模块

  require( "../app/bookmark/route.bookmark.js")(app); // 书签
  require( "../app/computerApp/route.computerApp.js")(app); // 本地应用
  require( "../app/todo/route.todo.js")(app); // 代办事项
  require( "../app/userCenter/route.userCenter.js")(app); // 用户中心
  require( "../app/attendance/route.attendance.js")(app); // 考勤管理
  require( "../app/home/route.home.js")(app); // 考勤管理

  //开启事务
  // var db = new sqlite3.Database(db_path);
  // db.run("CREATE TABLE foo (id INT, txt TEXT)");
  // db.run("BEGIN TRANSACTION");
  // var stmt = db.prepare("INSERT INTO foo VALUES(?, ?)");
  // for (var i = 0; i < count; i++) {
  // stmt.run(i, randomString());
  // }
  // db.run("COMMIT TRANSACTION");
}