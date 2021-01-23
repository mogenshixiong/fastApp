var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var exec = require('child_process').exec;
const os = require('os');

const schedule = require('node-schedule');
// var tool = require("./tool");

module.exports = function (socket) {
	getServerCpu(socket);
	
	var rule = new schedule.RecurrenceRule();
	rule.second = [1,6,11,16,21,26,31,36,41,46,51,56]; //每隔5秒执行1次
    schedule.scheduleJob(rule, function (err) {
        getServerCpu(socket);
    });
}

function getServerCpu(socket) {
    //获取服务器cpu使用率
	getDiskDrives().then(function(resolve) { //获取磁盘使用情况
		var data = {
			diskList : resolve,
			mem : { //内存使用情况
				totalmem : os.totalmem()/1024/1024/1024, //总计内存
				freemem : +os.freemem()/1024/1024/1024, //可用内存
			},
			uptime : os.uptime(), //系统的正常运行时间（以秒为单位）
			hostname : os.hostname(), //计算器主机名
			arch : os.arch(), //操作系统的 CPU 架构 如：x64
			v : 1.0 
		};
		socket.emit("getServerCpu", { code: 1,data:data});
	}, function(err){if (err) { throw err; }}); 
}

//异步获取服务器cpu使用率
function getDiskDrives(){
    return new Promise(function(resolve, reject) {
        getDrives(function(err, aDrives) {
            resolve(extractDiskListByResult(aDrives));
        });
    });
}

function extractDiskListByResult(aDrives){
    var list = [];
    //var current_disk = __dirname.substr(0,2).toLowerCase();//当前盘符
    //遍历所有磁盘信息
    for (var i = 0; i < aDrives.length; i++) {
        //只获取当前磁盘信息
        //if( aDrives[i].mounted.toLowerCase() == current_disk ){
            var obj = {
                mounted : aDrives[i].mounted, //盘符号
                total :  (aDrives[i].blocks /1024 /1024 /1024).toFixed(1),//总量,单位G
                used :  (aDrives[i].used /1024 /1024 /1024).toFixed(1), //已使用，单位G
                available : (aDrives[i].available /1024 /1024 /1024).toFixed(1), //可用
                capacity : aDrives[i].capacity //使用率
            };
            list.push(obj);
        //}
    }
    return list;
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