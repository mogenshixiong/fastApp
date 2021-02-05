
//页面跳转配置
module.exports = function (app) {
  //ui模板配置，可根据项目需要，自行增加其他UI模板。
  //新增的模板如果页面路径有变化，请自行修改如下配置。
  const adminTemplate = 'admin/layuiAdmin';
  const cmsTemplate = 'cms/layuiSimpleNews'

  const pages = [
    {reqUrl: '/', resUrl: cmsTemplate+'/index', mustLogin: false, pageName: '首页'},
    {reqUrl: '\/articleDetail*', pageName: '文章详情页', rule: "RegExp" ,break: true},

    {reqUrl: '/login', resUrl: adminTemplate+'/login/login', mustLogin: false, pageName: '登录页'},
    {reqUrl: '/index', resUrl: adminTemplate+'/index/index', mustLogin: true, pageName: '后台首页'},
    
    {reqUrl: '/myComputer', resUrl: adminTemplate+'/admin/myComputer', mustLogin: true, pageName: '我的电脑'},

    {reqUrl: '/cmsNavList', resUrl: adminTemplate+'/cmsNav/cmsNavList', mustLogin: true, pageName: 'CMS导航列表页'},
    {reqUrl: '/cmsNavForm', resUrl: adminTemplate+'/cmsNav/cmsNavForm', mustLogin: true, pageName: 'CMS导航表单页'},
    {reqUrl: '/cmsCarouselList', resUrl: adminTemplate+'/cmsCarousel/cmsCarouselList', mustLogin: true, pageName: 'CMS轮播图列表页'},
    {reqUrl: '/cmsCarouselForm', resUrl: adminTemplate+'/cmsCarousel/cmsCarouselForm', mustLogin: true, pageName: 'CMS轮播图表单'},
    {reqUrl: '/cmsCategoryList', resUrl: adminTemplate+'/cmsCategory/cmsCategoryList', mustLogin: true, pageName: 'CMS栏目设置列表页'},
    {reqUrl: '/cmsCategoryForm', resUrl: adminTemplate+'/cmsCategory/cmsCategoryForm', mustLogin: true, pageName: 'CMS栏目设置表单页'},
    {reqUrl: '/cmsCategoryTypeForm', resUrl: adminTemplate+'/cmsCategory/cmsCategoryTypeForm', mustLogin: true, pageName: 'CMS栏目分类设置表单页'},
    {reqUrl: '/cmsArticleList', resUrl: adminTemplate+'/cmsArticle/cmsArticleList', mustLogin: true, pageName: 'CMS文章列表页'},
    {reqUrl: '/cmsArticleForm', resUrl: adminTemplate+'/cmsArticle/cmsArticleForm', mustLogin: true, pageName: 'CMS文章详情页'},
    {reqUrl: '/website', resUrl: adminTemplate+'/website/website', mustLogin: true, pageName: 'CMS站点设置'},

    {reqUrl: '/wmsAttributesManage', resUrl: adminTemplate+'/wmsAttributesManage/wmsAttributesManage', mustLogin: true, pageName: '物品属性设置'},
    {reqUrl: '/wmsStockManage', resUrl: adminTemplate+'/wmsStockManage/wmsStockManage', mustLogin: true, pageName: '库存管理'},
    {reqUrl: '/wmsCheckRecord', resUrl: adminTemplate+'/wmsCheckRecord/wmsCheckRecord', mustLogin: true, pageName: '盘点记录'},
    {reqUrl: '/wmsOutRecord', resUrl: adminTemplate+'/wmsOutRecord/wmsOutRecord', mustLogin: true, pageName: '出库记录'},
    {reqUrl: '/wmsInRecord', resUrl: adminTemplate+'/wmsInRecord/wmsInRecord', mustLogin: true, pageName: '入库记录'},
    {reqUrl: '/wmsHandleRecord', resUrl: adminTemplate+'/wmsHandleRecord/wmsHandleRecord', mustLogin: true, pageName: '操作记录'},

    {reqUrl: '/userList', resUrl: adminTemplate+'/user/userList', mustLogin: true, pageName: '用户列表页'},
    {reqUrl: '/userForm', resUrl: adminTemplate+'/user/userForm', mustLogin: true, pageName: '用户表单页'},

    {reqUrl: '/404', resUrl: adminTemplate+'/tips/404', mustLogin: false, pageName: '404页面'},
  ];


  //拦截器↓
  app.get('*', async (req, res, next)=> {
    const reqUrl = req.url.split('?')[0];
    //退出方法单独处理
    if(isLogout(reqUrl, req, res) ==  true){ return; }
    
    var flag = false;
    var  isBreak = false;
    for(var i = 0;i < pages.length;  i++){

      if(pages[i].rule && pages[i].rule == "RegExp"){
        var reg = new RegExp(pages[i].reqUrl);
        var result = reg.test(reqUrl);
        if(result) {
          flag = true;
          isBreak = true;
          break;
        }
      }
      if(pages[i].reqUrl != reqUrl){
        continue;
      }
      if(pages[i].mustLogin){
        //需要登录验证
        if(req.session && req.session.data && req.session.data.loginName != ""){
          render(res, pages[i]);
        }else{
          res.redirect('/logout');
        }
      }else {
        //无需登录
        render(res, pages[i]);
      }
      flag = true;
      break;
    }

    if(flag == false){
      res.redirect('/404');
    }else if(isBreak){
      beforeEnd(req, res, app);
      next();
    }else {
      beforeEnd(req, res, app);
      res.end();
    }
  });

  //退出跳转特殊处理
  function isLogout(reqUrl, req, res){
    if( reqUrl === '/logout'){
      if(req.session){
        req.session.destroy(function(err) {
            res.redirect('/login');
        })
      }else {
          res.redirect('/login');
      }
      return true;
    }else {
      return false;
    }
  }
  //end前执行犯法
  function beforeEnd(req, res, app){

  }

  //跳转页面时 添加所需参数
  function render(res, config){
    if(config.reqUrl == '/'){
      res.render( config.resUrl ,{
        navs: global.cmaNavs,
        carouses: global.cmsCarouses,
        articles: global.cmsArticle,
        webSiteconfig: global.webSiteconfig,
      });
    } else if(config.reqUrl == '/website'){
      res.render( config.resUrl ,{
        webSiteconfig: global.webSiteconfig,
      });
    } else {
      res.render( config.resUrl );
    }
  }
}