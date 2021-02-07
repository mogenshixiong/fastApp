
//页面跳转统一管理
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render(global.cmsTemplate+'/index',{ //前台CMS首页
      navs: global.cmaNavs,
      carouses: global.cmsCarouses,
      articles: global.cmsArticle,
      webSiteconfig: global.webSiteconfig,
    });
  });
  app.get('/login', function (req, res) {
    res.render(global.adminTemplate+'/login/login'); //登录页
  });
  app.get('/index', function (req, res) {
    res.render(global.adminTemplate+'/index/index'); //后台首页
  });
  app.get('/myComputer', function (req, res) {
    res.render(global.adminTemplate+'/admin/myComputer'); //我的电脑
  });
  app.get('/cmsNavList', function (req, res) {
    res.render(global.adminTemplate+'/cmsNav/cmsNavList'); //CMS导航列表页
  });
  app.get('/cmsNavForm', function (req, res) {
    res.render(global.adminTemplate+'/cmsNav/cmsNavForm'); //CMS导航表单页
  });
  app.get('/cmsCarouselList', function (req, res) {
    res.render(global.adminTemplate+'/cmsCarousel/cmsCarouselList'); //CMS轮播图列表页
  });
  app.get('/cmsCarouselForm', function (req, res) {
    res.render(global.adminTemplate+'/cmsCarousel/cmsCarouselForm'); //CMS轮播图表单
  });
  app.get('/cmsCategoryList', function (req, res) {
    res.render(global.adminTemplate+'/cmsCategory/cmsCategoryList'); //CMS栏目设置列表页
  });
  app.get('/cmsCategoryForm', function (req, res) {
    res.render(global.adminTemplate+'/cmsCategory/cmsCategoryForm'); //CMS栏目设置表单页
  });
  app.get('/cmsCategoryTypeForm', function (req, res) {
    res.render(global.adminTemplate+'/cmsCategory/cmsCategoryTypeForm'); //CMS栏目分类设置表单页
  });
  app.get('/cmsArticleList', function (req, res) {
    res.render(global.adminTemplate+'/cmsArticle/cmsArticleList'); //CMS文章列表页
  });
  app.get('/cmsArticleForm', function (req, res) {
    res.render(global.adminTemplate+'/cmsArticle/cmsArticleForm'); //CMS文章详情页
  });
  app.get('/website', function (req, res) {//CMS站点设置
    res.render(global.adminTemplate+'/website/website',{
      webSiteconfig: global.webSiteconfig,
    }); 
  });
  app.get('/wmsAttributesManage', function (req, res) {
    res.render(global.adminTemplate+'/wmsAttributesManage/wmsAttributesManage'); //物品属性设置
  });
  app.get('/wmsStockManage', function (req, res) {
    res.render(global.adminTemplate+'/wmsStockManage/wmsStockManage'); //库存管理
  });
  app.get('/wmsCheckRecord', function (req, res) {
    res.render(global.adminTemplate+'/wmsCheckRecord/wmsCheckRecord'); //盘点记录
  });
  app.get('/wmsOutRecord', function (req, res) {
    res.render(global.adminTemplate+'/wmsOutRecord/wmsOutRecord'); //出库记录
  });
  app.get('/wmsInRecord', function (req, res) {
    res.render(global.adminTemplate+'/wmsInRecord/wmsInRecord'); //入库记录
  });
  app.get('/wmsHandleRecord', function (req, res) {
    res.render(global.adminTemplate+'/wmsHandleRecord/wmsHandleRecord'); //操作记录
  });
  app.get('/userList', function (req, res) {
    res.render(global.adminTemplate+'/user/userList'); //用户列表页
  });
  app.get('/userForm', function (req, res) {
    res.render(global.adminTemplate+'/user/userForm'); //用户表单页
  });
  app.get('/logout', function (req, res) { // 退出
    if(req.session){
      req.session.destroy(function(err) {
        res.redirect('/login');
      })
    }else {
      res.redirect('/login');
    }
  });
}