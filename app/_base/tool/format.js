var date = require("silly-datetime");
var BASECONST = require('../const/baseConst');

function formatReturn(obj){
    return {
        code: obj.code , //数据状态码
        msg: obj.msg , //提示
        data: obj.data, //返回数据
        date: date.format(new Date(),'YYYY-MM-DD HH:mm:ss'), //当前时间
    }
}

function newResult(){
	return {
        code: BASECONST.SUCCESS ,
        msg: "success"
    }
}

module.exports.newResult = newResult; //格式化API返回格式
module.exports.formatReturn = formatReturn; //格式化API返回格式