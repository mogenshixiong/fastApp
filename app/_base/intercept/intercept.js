module.exports = function (app) {
  //登录拦截器
  notNecessaryPage = [
    '/', // 前台cms首页
    '/login', //登录页
  ];
  
  app.get('*', async (req, res, next)=> {
    if (req.session.data && req.session.data.loginName ) { //登录状态时不拦
      next();
    }else{
      isRedirect = true;
      for(var i=0;i<notNecessaryPage.length; i++){
        if(notNecessaryPage[i] == req.url){
          isRedirect = false;
          next();
          break;
        }
      }
      if(isRedirect){
        res.redirect('/login');
        res.end();
      }
    }
  });
}