const exec = require('child_process').exec;

function openFolder(path){
  exec(`explorer.exe "${path}"`)
}

module.exports.openFolder = openFolder; //打开文件夹（文件也可以）