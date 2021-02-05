
const sqlite3 = require("sqlite3").verbose();

global.webSiteconfig = {}; // 网站设置
global.config = {}; // config配置文件
global.license = {}; // license配置文件
global.publicKey = ''; //秘钥

// 数据库链接管理
global.sqlite3 = {
  base: new sqlite3.Database(process.cwd()+"/db/base.db"),
  attendance: new sqlite3.Database(process.cwd()+"/db/attendance.db"),
  user: new sqlite3.Database(process.cwd()+"/db/user.db"),
}; 

global.cmaNavs = {}; // CMS导航
global.cmsCarouses = {}; // cms轮播图
global.cmsCategory = {}; //cms栏目
global.cmsCategoryType = {} ; // cms栏目分类
global.cmsArticle = {}; // cms 文章
