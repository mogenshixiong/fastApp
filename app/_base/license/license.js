var vbs = require('../utils/vbs');
const md5 = require('md5-node');
const {machineId, machineIdSync} = require('node-machine-id');
const path = require('path');
var fs = require('fs');

module.exports.check = function(){
  if( global.license == md5(machineIdSync({original: true})+global.publicKey) ){ 
    global.hasLicense = true;
  }else{
    fs.writeFile(path.join( process.cwd(), "./注册码.txt"), machineIdSync({original: true}) , function (error) {
      if (error) {
        console.log(error);
        writeErrorLog( error );
      } else {
        
      }
      console.log("软件未授权，请联系作者获取授权许可。");
      vbs.alert("软件未授权，部分功能将受到影响。请联系作者获取授权许可方可获取全部功能。","提示!");
      // 具体需要如何限制，根据 global.hasLicense 自行添加逻辑
      // 或者可 直接 抛出异常 终止服务
      setTimeout(function(){
        throw error;
      },1000)
    })
  }
}

// console.log("操作系统："+process.platform);
// console.log("用户环境信息：");
// console.log(process.env);