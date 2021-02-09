const path = require('path');
var fs = require('fs');
const uuid = require('node-uuid');
var date = require("silly-datetime");
function writeErrorLog(err){
    console.log(err);
    if(err === undefined){
        return;
    }
    var str = "";
    str += "error message :" + err.message +"\n";
    str += "error stack :" + err.stack +"\n";
    fs.writeFile(path.join( process.cwd(), "./log/log-"+date.format(new Date(),'YYYY-MM-DD-HH-mm-ss')+".txt"), str, function (error) {
        if (error) {
            console.log('发现错误，日志写入失败');
            // console.log(error);
        } else {
            console.log('发现错误，错误信息已写入log，如需修复，请将错误信息发送至管理员。')
        }
    })
}

module.exports.writeErrorLog = writeErrorLog;