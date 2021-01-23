var date = require("silly-datetime");
function getNow(format){
  if(format == null || format.trim()== ''){
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  return date.format(new Date(),format);
}

module.exports.getNow = getNow;