
const sqlite3 = require("sqlite3").verbose();
const tool = require('../tool/tool'); 
global.password = tool.getConfig('./config/password.json'); //私密配置

global.nodemailerOptionsConfig = tool.getConfig('./config/nodemailerOptionsConfig.json'); // 邮件配置
global.nodemailerOptionsConfig.auth.pass = global.password.ndemailderOptionPass  || ''; // 设置邮件授权码

global.webSiteconfig = {}; // 网站设置

global.config = {}; // config配置文件
global.license = tool.getConfig('./config/license.json').license; // license配置文件
global.hasLicense = false; // 是否取得了授权
global.publicKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMt7'; //授权加密密钥

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

global.adminTemplate = 'admin/layuiAdmin'; // 后台UI模板
global.cmsTemplate = 'cms/layuiSimpleNews'; // 后台UI模板