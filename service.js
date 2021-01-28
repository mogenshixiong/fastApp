const express = require("express");
const app = express();
const main = require("./app/main");
const {alert} = require('./app/_base/utils/vbs');
const {writeErrorLog} = require('./app/_base/utils/logUtils');
const {consoleWelcome} = require('./app/_base/tool/tool');

try {

    // 程序总入口
    main(app);

    app.listen( global.config.port ,'0.0.0.0' , () => {
        consoleWelcome();
    });
    
} catch ( err ) {
    let dev = false; //开启开发者模式

    if( dev ){
        console.log(err);
    }else {
        //pkg打包后，未捕获异常将导致程序直接崩溃。
        alert('系统错误',"错误");
        writeErrorLog( err );
    }
}