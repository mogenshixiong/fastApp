安装命令
npm install sqlite3 --save
npm i node-pre-gyp
npm install


fastApp致力于开发一款js前端快速开发框架。

封装了常用的license授权验证，session持久化，用户登录注册，权限控制，角色分配，菜单管理等常用功能。
集成常用的cms,wms等常用系统功能。
开发者可以在此基础上非常快速的实现自己的业务。
并支持把应用打包成exe执行程序，、由于数据库使用轻量级的sqlite，打包后的程序不依赖任何其他环境，可以直接双击启动。
结合license授权功能，可以支持前端开发者开发属于自己的收费应用。

启动命令： nodemon
打包windows应用命令：pkg -t win package.json -o E:\mogenshixiong\摩根师兄
macos打包命令： pkg -t macos package.json -o E:\mogenshixiong\摩根师兄

打包注意事项
1.打包时不会打包static及file文件夹。需要手工拷贝到exe程序统计目录。（其中file文件夹如果可以根据自己的需要，可以不拷贝）
2.node_sqlite3.node模块无法打包到exe程序中，需要手工拷贝到exe同级目录下。

