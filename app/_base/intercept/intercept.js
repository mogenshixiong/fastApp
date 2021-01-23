module.exports = function (app) {
    //只拦截get请求,
    //! 与pages.js 配置重复
    // app.get('*', async (req, res, next)=> {
    //     if (req.session.data && req.session.data.loginName ) { //登录状态时不拦
    //         next();
    //     }else if (req.url ==  '/login') { //登录页面不拦截
    //         next();
    //     }else{
    //         res.redirect('/login');
    //         res.end();
    //     }
    // });
}