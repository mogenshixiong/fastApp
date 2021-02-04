const child_process = require('child_process');
const exec = child_process.exec;
var execFile = require('child_process').execFile;
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const uuid = require('node-uuid');
const os = require('os');

//使用VBS脚本 调用系统警告弹窗
function alert(content, title) {
	var shell = 'mshta "javascript:var sh=new ActiveXObject("WScript.Shell");'
		+ ' sh.Popup("' + content + '", 10, "' + title + '", 64 );close()"'
	exec(shell);
}
//封装新增Sql
function createsql_add(obj, tableName) {
	var fields = [];
	var values = [];
	for (const key in obj) {
		fields.push(key);
		values.push("'" + replaceCharacters(obj[key]) + "'");
	}
	//insert into user (username, password, email) values('buding', '1111', '221@sdsd.com')
	var addsql = "INSERT INTO " + tableName + "(" + fields.join(",") + ") VALUES (" + values.join(",") + ")";

	return addsql;
}

//替换SQL的输入字符'
function replaceCharacters(str) {
	if (typeof str == "string") {
		var result = str.replace(/'/g, '\"');//'字符会影响SQL的语法
		return result;
	} else {
		return str;
	}
}

function open(url) {
	if (url.indexOf("exe") !== -1 && confirmEnding(url, 'exe')) {
		openExe(url);
	} else {
		openDefaultBrowser(url);
	}
}
//判断一个字符串(str)是否以指定的字符串(target)结尾。 如果是，返回true;如果不是，返回false。
function confirmEnding(str, target) {
	var a = target.length;
	var s = str.substr(-a);
	return s == target;
}
function openExe(path) {
	execFile(path, function (err, data) {
		// console.log(err)
		// console.log(data.toString());
	});
}

//打开默认浏览器
function openDefaultBrowser(url) {
	console.log("open : " + url);
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
					for (var i = 0; i < aLines.length; i++) {
						if (aLines[i] != '') {
							var aTokens = aLines[i].split('=');
							switch (aTokens[0]) {
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
									filesystem: sDescription,
									blocks: sSize,
									used: sUsed,
									available: sFreeSpace,
									capacity: sPercent,
									mounted: sCaption
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
					for (var i = 0; i < aLines.length; i++) {
						var sLine = aLines[i];
						if (sLine != '') {
							sLine = sLine.replace(/ +(?= )/g, '');
							var aTokens = sLine.split(' ');
							aDrives[aDrives.length] = {
								filesystem: aTokens[0],
								blocks: aTokens[1],
								used: aTokens[2],
								available: aTokens[3],
								capacity: aTokens[4],
								mounted: aTokens[5]
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

module.exports.getDrives = getDrives;//!获取磁盘内存等信息
module.exports.open = open;//!打开默认浏览器
module.exports.openExe = openExe;//!打开默认浏览器
module.exports.openDefaultBrowser = openDefaultBrowser;//!打开默认浏览器
module.exports.createsql_add = createsql_add;//!封装新增Sql
module.exports.alert = alert;//!使用VBS脚本 调用系统警告弹窗