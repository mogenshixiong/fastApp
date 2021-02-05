const  child_process  = require('child_process');
const  exec = child_process.exec;
var execFile = require('child_process').execFile;
const os = require('os');
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const uuid = require('node-uuid');
const key = "齉龘靐齾爩麤龗灪龖厵爨癵驫麣纞虋讟钃鸜麷鞻韽韾顟顠饙騳騱饐鱻籱虪齺鬰飝靊魕爧蠿饢讞鑱";

module.exports.consoleWelcome = consoleWelcome;//打印欢迎语
module.exports.registerDrives = registerDrives;//启动时 注册所有盘符
module.exports.getConfig = getConfig; // 同步获取配置信息
module.exports.filterArrayEmptyValues = filterArrayEmptyValues;//删除数组中的空置
module.exports.getParametersFromRequstBody = getParametersFromRequstBody;//从requst中获取指定参数
module.exports.getDrives = getDrives;//获取磁盘内存等信息
module.exports.open = open;//打开默认浏览器
module.exports.openExe = openExe;//打开默认浏览器
module.exports.openDefaultBrowser = openDefaultBrowser;//打开默认浏览器
module.exports.getIPAdress = getIPAdress;//获取本机IP
module.exports.constantize = constantize;//冻结Obj,使其不能被修改。
module.exports.delete_objList_keys = delete_objList_keys;//删除对象数组中指定的属性
module.exports.delete_obj_keys = delete_obj_keys;//删除对象中指定的属性
module.exports.openOnService = openOnService;//服务启动时打开浏览器
module.exports.setLocals = setLocals;//服务启动时设置全局变量
module.exports.enCodeByMogen = enCodeByMogen;//摩根师兄专用字符串加密
module.exports.deCodeByMogen = deCodeByMogen;//摩根师兄专用字符串解密
module.exports.testCode = testCode;
module.exports.hasFileFolder = hasFileFolder; // 检查当前工程下是否包含该文件夹
module.exports.createFileFolder = createFileFolder; // 创建文件夹

function hasFileFolder(path){
	if (fs.existsSync(path)) {
		// console.log('该路径已存在');
		return true;
	}else {
		console.log('读取路径不存在：'+path);
		return false;
	}
}
function createFileFolder(path){
	if (fs.existsSync(path)) {
		return;
	}else {
		console.log('创建文件夹：'+path);
		fs.mkdirSync(path);
	}
}
function testCode(){
	//test code begin
	//request post out api
	var request = require('request');
	var reqData1 = { key: 123 };
	// request({
	//         url: 'http://xxx/getVerify?account=123456',
	//         method: 'POST',
	//         json: true ,
	//         headers: {
	//             'Content-Type':'application/json' 
	//         },
	//         body: JSON.stringify(reqData1)
	//     },function(error, response, body){

	//     }
	// );

	//request get out api
	// var reqData2 = { key: 123 };
	// request({
	// 		url: 'http://www.weather.com.cn/data/cityinfo/101030500.html',//城市代码
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type':'text/json' 
	// 		}
	// 	},function(error, response, body){
	// 		if( !error && response.statusCode==200 ){
	// 			console.log(JSON.parse(body));
	// 		}else {
	// 			console.log(error);
	// 		}
	// 	}
	// );
	//test code end
}
function deCodeByMogen(str){
	//定义密钥，36个字母和数字
    //var key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //var key = "齉龘靐齾爩麤龗灪龖厵爨癵驫麣纞虋讟钃鸜麷鞻韽韾顟顠饙騳騱饐鱻籱虪齺鬰飝靊魕爧蠿饢讞鑱";
    var l = key.length;  //获取密钥的长度
    var b, b1, b2, b3, d = 0;  //定义临时变量
    var s = new Array(Math.floor(str.length / 3));  //计算加密字符串包含的字符数，并定义数组
    b = s.length;  //获取数组的长度
    for (var i = 0; i < b; i ++) {  //以数组的长度循环次数，遍历加密字符串
        b1 = key.indexOf(str.charAt(d));  //截取周期内第一个字符串，计算在密钥中的下标值
        d ++;
        b2 = key.indexOf(str.charAt(d));  //截取周期内第二个字符串，计算在密钥中的下标值
        d ++;
        b3 = key.indexOf(str.charAt(d));  //截取周期内第三个字符串，计算在密钥中的下标值
        d ++;
        s[i] = b1 * l * l + b2 * l + b3  //利用下标值，反推被加密字符的Unicode编码值
    }
    b = eval("String.fromCharCode(" + s.join(',') + ")");//用fromCharCode()算出字符串
    return b ;  //返回被解密的字符串
}
function enCodeByMogen(str){
	//定义密钥，36个字母和数字
    //var key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //var key = "齉龘靐齾爩麤龗灪龖厵爨癵驫麣纞虋讟钃鸜麷鞻韽韾顟顠饙騳騱饐鱻籱虪齺鬰飝靊魕爧蠿饢讞鑱";
    var l = key.length;  //获取密钥的长度
    var a = key.split("");  //把密钥字符串转换为字符数组
    var s = "",b, b1, b2, b3;  //定义临时变量
    for (var i = 0; i <str.length; i ++) {  //遍历字符串
        b = str.charCodeAt(i);  //逐个提取每个字符，并获取Unicode编码值
        b1 = b % l;  //求Unicode编码值得余数
        b = (b - b1) / l;  //求最大倍数
        b2 = b % l;  //求最大倍数的于是
        b = (b - b2) / l;  //求最大倍数
        b3 = b % l;  //求最大倍数的余数
        s += a[b3] + a[b2] + a[b1];  //根据余数值映射到密钥中对应下标位置的字符
    }
    return s;  //返回这些映射的字符
}
function setLocals(app){//服务启动时设置全局变量
	app.locals["siteTitle"] = global.config.siteTitle || "摩根师兄";
}
function openOnService(){//服务启动时打开浏览器
	if( global.config.startup_open_url ){
		var basePath = 'http://'+getIPAdress()+':'+global.config.port;
		open(basePath);
	}
}
//使用默认浏览器打开url
function open(url){
    if( url.indexOf("exe") !== -1 && confirmEnding(url,'exe') ){
        openExe(url);
    }else{
        openDefaultBrowser(url);
    }
}
//判断一个字符串(str)是否以指定的字符串(target)结尾。 如果是，返回true;如果不是，返回false。
function confirmEnding(str, target) {
	var a=target.length;
	var s =str.substr(-a);
	return s==target;
}
function openExe(path){
    execFile(path, function(err, data) {
        // console.log(err)
        // console.log(data.toString());
    });
}

//打开默认浏览器
function openDefaultBrowser(url) {
    switch (process.platform) {
      case "darwin":
        exec('open ' + url);
        break;
      case "win32":
        exec('start ' + url);
        break;
      default:
        exec('xdg-open', [url]);
    }
}

//diskinfo模块，但是有BUG。所以自己在这里进行改动
//bug:每一次调用时没有情况aDrives返回对象，造成每一次调用时都会加上上一次返回的数据。
function getDrives(callback) {
	var aDrives = [];
	switch (os.platform().toLowerCase()) {
        case 'win32':
		
			// Windows 32
			// Tested on Vista 			
			
			// Run command to get list of drives
			var oProcess = exec(
				'wmic logicaldisk get Caption,FreeSpace,Size,VolumeSerialNumber,Description  /format:list',
				function (err, stdout, stderr) {
					if (err) return callback(err, null);
					
					var aLines = stdout.split('\r\r\n');
					var bNew = false;
					var sCaption = '', sDescription = '', sFreeSpace = '', sSize = '', sVolume = '';
					// For each line get information
					// Format is Key=Value
					for(var i = 0; i < aLines.length; i++) {						
						if (aLines[i] != '') {
							var aTokens = aLines[i].split('=');
							switch  (aTokens[0]) {
								case 'Caption':											
									sCaption = aTokens[1];
									bNew = true;
									break;
								case 'Description':									
									sDescription = aTokens[1];									
									break;
								case 'FreeSpace':
									sFreeSpace = aTokens[1];
									break;
								case 'Size':
									sSize = aTokens[1];
									break;
								case 'VolumeSerialNumber':
									sVolume = aTokens[1];
									break;
							}
						
						} else {
							// Empty line 
							// If we get an empty line and bNew is true then we have retrieved
							// all information for one drive, add to array and reset variables
							if (bNew) {								
								sSize = parseFloat(sSize);
								if (isNaN(sSize)) {
									sSize = 0;
								}
								sFreeSpace = parseFloat(sFreeSpace);
								if (isNaN(sFreeSpace)) {
									sFreeSpace = 0;
								}
								
								var sUsed = (sSize - sFreeSpace);
								var sPercent = '0%';
								if (sSize != '' && parseFloat(sSize) > 0) {
									sPercent = Math.round((parseFloat(sUsed) / parseFloat(sSize)) * 100) + '%';
								}
								aDrives[aDrives.length] = {
														filesystem:	sDescription,
														blocks:		sSize,
														used:		sUsed,
														available:	sFreeSpace,
														capacity:	sPercent,
														mounted:	sCaption
													  };
								bNew = false;
								sCaption = ''; sDescription = ''; sFreeSpace = ''; sSize = ''; sVolume = '';
							}
						
						}
					}
					// Check if we have callback 
					if (callback != null) {
						callback(null, aDrives);
					}
					return aDrives;
				}
			);			
			
			break;
			
        case 'linux':
			// Linux 
			// Tested on CentOS
        default:
		
			// Run command to get list of drives 
			var oProcess = exec(
				'df -P | awk \'NR > 1\'',
				function (err, stdout, stderr) {
					if (err) return callback(err, null);
					var aLines = stdout.split('\n');
					// For each line get drive info and add to array
					for(var i = 0; i < aLines.length; i++) {					
						var sLine = aLines[i];
						if (sLine != '') {
							sLine = sLine.replace(/ +(?= )/g,'');
							var aTokens = sLine.split(' ');
							aDrives[aDrives.length] = {
                                filesystem:	aTokens[0],
                                blocks:		aTokens[1],
                                used:		aTokens[2],
                                available:	aTokens[3],
                                capacity:	aTokens[4],
                                mounted:	aTokens[5]
                            };
						}
					}
					// Check if we have a callback
					if (callback != null) {
						callback(null, aDrives);
					} 
					return aDrives;
				}
			);				
    }
}



//获取本机IP
function getIPAdress(){
	var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

//冻结Obj,使其不能被修改。
//例： const obj = constantize({a:1})
function constantize (obj){
	Object.freeze(obj);
	Object.keys(obj).forEach( (key, i) => {
	  if ( typeof obj[key] === 'object' ) {
		constantize( obj[key] );
	  }
	});
};

//删除对象数组中指定的属性,如果list传了一个对象，返回时自动格式化为数组
function delete_objList_keys(list,keys){
	if(list){
		if(Object.prototype.toString.call(list) === '[object Object]'){
			for(var index in keys){
				list[keys[index]] = undefined;//设置undefined实现删除属性
			}
			return [list];
		}else{ //'[object Array]'
			return list.map((item)=>{
				for(var index in keys){
					item[keys[index]] = undefined;//设置undefined实现删除属性
				}
				return item;
			});
		}
	}else{
		return [];
	}
}
//删除对象中指定的属性
function delete_obj_keys(obj,keys){
	if(obj){
		for(var index in keys){
			obj[keys[index]] = undefined;//设置undefined实现删除属性
		}
	}else{
		obj={}
	}
	return obj;
}

//从requst中获取指定参数
function getParametersFromRequstBody(keyList,req){
	var obj = {};
	keyList.map(item=>{
		obj[item] = req.body[item] || ""
	})
	return obj;
}
function filterArrayEmptyValues(array){
	return array.filter(function (s) {
		return s && (s.trim() != "");
	});
}
function getConfig(path){
	var config = fs.readFileSync(path);
	config = JSON.parse( config.toString() );
	return config;
}
function registerDrives(app){
	getDrives(function(err, aDrives) { // 获取所有盘符
		global.drives = [];
		for (const key in aDrives) {
				if (aDrives.hasOwnProperty(key)) {
						//所有盘符都注册为静态文件，以便node可以访问到电脑所有文件
						app.use(
							'/'+aDrives[key].mounted.split(":")[0], 
							express.static( aDrives[key].mounted+"\\" )
						);
						global.drives.push( `${aDrives[key].mounted}\\` );
				}
		}
		// console.log(global.drives);
  });
}
function consoleWelcome(){
	console.log("======================================================================");
	console.log("");
	console.log("启动成功,欢迎使用本系统  Powered By 摩根师兄 http://mogenshixiong.com");
	console.log("");
	console.log('内网访问IP地址：http://'+getIPAdress()+':'+global.config.port);
	// if(global.config.internetIp && global.config.internetIp != ""){
	// 	console.log('外网访问IP地址：http://'+global.config.internetIp+':'+global.config.port);
	// }
	// if(global.config.domain && global.config.domain != ""){
	// 	console.log('域名访问地址：http://'+global.config.domain+':'+global.config.port);
	// }
	console.log("");
	console.log("======================================================================");
}
