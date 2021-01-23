var vbs = require('../utils/vbs');
const md5 = require('md5-node');
const {machineId, machineIdSync} = require('node-machine-id');
const path = require('path');
var fs = require('fs');

module.exports.check = function(){
    var obj =  global.license ;
    if( obj.license == md5(machineIdSync({original: true})+global.publicKey) ){ 
        return true;
    }else{
        fs.writeFile(path.join( process.cwd(), "./注册码.txt"), machineIdSync({original: true}) , function (error) {
            if (error) {
                console.log(error);
            } else {
                
            }
            console.log("软件未授权，请联系作者获取授权许可。");
            vbs.alert("软件未授权，请联系作者获取授权许可。","提示!");
            return false;
        })
    }
}

// console.log("操作系统："+process.platform);
// console.log("用户环境信息：");
// console.log(process.env);