

//! sqlite3版本的session
//https://github.com/theogravity/express-session-sqlite
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const sqliteStoreFactory  = require('express-session-sqlite').default;
const SqliteStore = sqliteStoreFactory(session);

//! sqlite3版本的session，使用pkg打包后 不会自动创建session表。需要手动创建
require('./models.sessions');
require('./models.migrations');//这个库是干啥的  我还不知道

module.exports = function (app) {
    app.use(cookieParser());
    app.use(session({
        name: 'mg', //设置cookie名称：m
        secret: 'hellomg',//参与加密的字符串，又称签名
        saveUninitialized: false,//是否在储存内容之前创建会话。
        resave: true,//是否在每次强求时，强制重新保存session，即使他们没有变化
        store: new SqliteStore({
            driver: sqlite3.Database,
            path: process.cwd()+"/db/base.db",
            ttl: 1000 * 60 * 60 *24 * 7,// Time To Live 会话TTL（毫秒）
            //prefix: 'sess:',//（可选）会话id前缀。默认值为无前缀。
            // cleanupInterval（可选）调整用于删除过期会话行的清理计时器（毫秒）
            cleanupInterval: 1000 * 60 * 60 *24 * 7  
        }),
        cookie: {
            httpOnly: true, //开启后不允许前台js修改cookie
            maxAge: 1000 * 60 * 60 * 24 * 365//cookie过期时间 365天
        }
    }))
}



//! Mongo版本的session
// var cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// module.exports = function(app){
//     app.use(cookieParser());
//     app.use(session({
//         name: 'mg', //设置cookie名称：m
//         secret: 'hellomg',//参与加密的字符串，又称签名
//         saveUninitialized: false,//是否在储存内容之前创建会话。
//         resave: true,//是否在每次强求时，强制重新保存session，即使他们没有变化
//         store: new MongoStore({
//             url: config.get("ab"), //mongodb://localhost:27017/mg
//             touchAfter: 60 //修改频率（例：在0.5小时之内只允许修改一次。）
//         }),
//         cookie: {
//             httpOnly: true, //开启后不允许前台js修改cookie
//             maxAge: 1000 * 60 * 60 * 24 * 365//cookie过期时间 365天
//         }
//     }));
// }

//!文件版本session
// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
// const cookieParser = require('cookie-parser');
// var fileStoreOptions = {};

// module.exports = function(app){
//     app.use(cookieParser());
//     app.use(session({
//         resave: false, //添加 resave 选项
//         saveUninitialized: true, //添加 saveUninitialized 选项
//         store: new FileStore(fileStoreOptions),
//         cookie:{maxAge:1000*60*30},
//         secret: 'keyboard cat'
//     }));
// }