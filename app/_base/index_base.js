
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
  
  tool.registerDrives(app); // 挂载所有盘符

  // 设置静态文件路径映射
  app.use('/static', express.static( path.join(process.cwd(), './static') )); 
  app.use('/file', express.static( path.join( process.cwd(), './file') ));

  tool.setLocals(app);  // 设置前台locals

  require("./session/session")(app); //引入session 模块
  
  require( "./intercept/pages")(app); // 统一页面管理

  require( "./utils/emailUtils"); // 加载邮箱模块
}