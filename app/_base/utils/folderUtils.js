const exec = require('child_process').exec;

function openFolder(path){
  exec(`explorer.exe "${path}"`)
}

module.exports.openFolder = openFolder;