var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var child = require('child_process');
const exec = require('child_process').execSync;
const os = require('os');
const base = require('../_base/utils/base');
const log = require('../_base/utils/logUtils');
module.exports = function (app) {

    //!锁屏脚本
    app.post('/lockWorkStation', urlencodedParser, async (req, res) => {
        exec('rundll32.exe user32.dll LockWorkStation');
        res.json({ code: 1});
    });
    app.post('/getIp', urlencodedParser, async (req, res) => {
        var interfaces = require('os').networkInterfaces();
        for(var devName in interfaces){
            var iface = interfaces[devName];
            for(var i=0;i<iface.length;i++){
                var alias = iface[i];
                if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                    res.json({ code: 1,data:alias.address});
                }
            }
        }
        
    });

    //!执行关机脚本
    //https://www.cnblogs.com/wxmdevelop/p/5036795.html
    app.post('/shutdown', urlencodedParser, async (req, res) => {
        var countdown = req.body.countdown || 60*5 ;
        var shell = 'shutdown -t '+ countdown +' -s';
        child.exec( shell , { encoding: 'buffer' } ,function (error, stdout, stderr) {
            if (error !== null) {
                res.json({ code: 0});
                log.writeErrorLog(error);
            }else{
                // console.log(stdout, iconv.decode(stdout, 'cp936'));
                res.json({ code: 1});
            }
        });
    });
    //!取消关机
    //https://www.cnblogs.com/wxmdevelop/p/5036795.html
    app.post('/cancelShutdown', urlencodedParser, async (req, res) => {
        child.exec( 'shutdown -a' , { encoding: 'buffer' } ,function (error, stdout, stderr) {
            if (error !== null) {
                res.json({ code: 0});
                log.writeErrorLog(error);
            }else{
                // console.log(stdout, iconv.decode(stdout, 'cp936'));
                res.json({ code: 1});
            }
        });
    });

    //获取服务器cpu使用率
    app.post('/getServerCpu', urlencodedParser, async (req, res) => {
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
            res.json({ code: 1,data:data});
        }, function(err){if (err) { log.writeErrorLog(err) }}); 
    });
    
}


//获取服务器cpu使用率
function getDiskDrives(){
    return new Promise(function(resolve, reject) {
        base.getDrives(function(err, aDrives) {
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