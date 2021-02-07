//vbs语法教程
// https://blog.csdn.net/zhouqt/article/details/79514398
// 杀死酷狗音乐进程
//taskkill/fi "imagename eq KuGou.exe"
// 杀死 chrome 进程
//taskkill/fi "imagename eq chrome.exe"
// 杀死 微信 进程
// taskkill/fi "imagename eq wechat.exe"


const  child_process  = require('child_process');
const  exec = child_process.exec;

//使用VBS脚本 调用系统警告弹窗
function alert(content,title,fn){
    var shell = 'mshta "javascript:var sh=new ActiveXObject("WScript.Shell");'
        +' sh.Popup("'+content+'", 10, "'+title+'", 64 );close()"';
    
    exec(shell);
}

module.exports.alert = alert;//使用VBS脚本 调用系统警告弹窗

// test code
// alert("输入错误","错误");