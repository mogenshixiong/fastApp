
require("ejs");// pkg打包 需手动引入ejs
const tool = require('./tool/tool');
const express = require("express");
const path = require('path');

module.exports = function (app) {
  app.set('view engine', "ejs");
  app.set('views', "./views");

  require( "./license/index_license")(app); // 加载授权验证模块

  // 加载config配置
  global.config = tool.getConfig('./config/config.json');
  global.webSiteconfig = tool.getConfig('./config/webSiteConfig.json'); 

  // 挂载所有盘符
  tool.registerDrives(app); 

  //检查目录结构,创建核心目录，db,file,log,
  tool.initFileFolder();


  // 设置静态文件路径映射
  app.use('/static', express.static( path.join(process.cwd(), './static') )); 
  app.use('/file', express.static( path.join( process.cwd(), './file') ));

  // 设置前台locals
  tool.setLocals(app); 

  //引入session 模块
  require("./session/session")(app);
  

  // 设置拦截器
  require( "./intercept/intercept")(app);
  require( "./intercept/pages")(app);

}