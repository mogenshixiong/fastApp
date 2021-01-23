const sqlite3 = require("sqlite3").verbose();
let sqliteDbPath = process.cwd()+"/db/base.db";
var db = new sqlite3.Database(sqliteDbPath);//打开数据库链接
const dbUtils = require("../_base/utils/dbUtils");

async function dbRun(){
  return new Promise((resolve, reject) => {
    //初始化时创建表
    db.run("CREATE TABLE IF NOT EXISTS  sys_cmsArticle" + "  (" +
      "id TEXT PRIMARY KEY NOT NULL," + 
      "title TEXT NOT NULL," + //标题
      "keyword TEXT ," + //关键词
      "summary TEXT ," + //摘要
      "content TEXT ," + //正文
      "content_format TEXT ," + //正文格式：markdow 或富文本编辑
      "cover TEXT ," + //封面
      "file TEXT ," + //附件
      "source TEXT ," + //来源
      "autor TEXT ," + //作者
      "label TEXT ," + //标签
      "category_url TEXT ," + //栏目
      "category_type_url TEXT ," + //分类
      "collect_count TEXT ," + //收藏量
      "read_count TEXT ," + //阅读量
      "relay_count TEXT ," + //转发量
      "start_count TEXT ," + //点赞量
      "reply_count TEXT ," + //回复量
      "correlation_article TEXT ," + //相关文章 推荐文章

      "sort INTEGER ," + //排序
      "status TEXT DEFAULT '1'," + // 0已删除 1已发布 2草稿
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
        global.cmsArticle = await dbUtils.getArticleList();
        console.log('cms文章加载完成！（'+cmsArticle.length+'）');
      }
      db.close();
    });
  });
}

dbRun();

