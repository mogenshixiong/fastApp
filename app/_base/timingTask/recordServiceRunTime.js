const nodeTimer = require('./schedule');
var date = require("silly-datetime");
const os = require('os');
const sqlite3 = require("sqlite3").verbose();
const uuid = require('node-uuid');

let sqliteDbPath = process.cwd()+"/db/user.db";
const base = require('../common/tool');

computerBootLog();//启动时执行
nodeTimer.scheduleTimer('00 * * * * *', function (err) {//每分钟的第0秒时开始执行
    computerBootLog(); //计算机启动日志
});

//记录电脑运行时间。
function computerBootLog(){
    // console.log(date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    //     +" - 执行定时任务：更新计算机运行时间。");
    var db = new sqlite3.Database(sqliteDbPath);

    var uptime = os.uptime();// 系统运行秒数
    var obj = {
        id : uuid.v1(),
        working : uptime * 1000 ,// 系统运行毫秒数
        startup_time :date.format(+new Date() - uptime*1000 ) , //开机时间
        startup_time_stamp : new Date( date.format(+new Date() - uptime*1000 ) ).getTime(), //开机时间的时间戳。
        shutdown_time : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'), //当前时间,既关机时间
        shutdown_time_stamp : new Date( date.format(new Date(), 'YYYY-MM-DD HH:mm:ss') ).getTime() //关机时间的时间戳。
    };
    
    //查询开机时间最近的第一条记录
    db.get("select * from computerBootLog where 1=1 order by startup_time_stamp desc", function(err, row) {
        if (err) {
            throw err;
        }else {
            if(row){ 
                //当这最新一条的数据的开机时间 跟 本次获取的开机时间误差在5000毫秒之内。（实际是会有1000毫秒的误差）
                //并且当前获取的运行时间大于这条记录的运行时间。
                if( (( obj.startup_time_stamp - 5000) < row.startup_time_stamp < ( obj.startup_time_stamp + 5000)) 
                    && obj.working > row.working){
                    //则更新这条记录的关机时间、关机时间时间戳、工作时间。
                    var sql = 'update computerBootLog set shutdown_time="'+obj.shutdown_time+'",  '
                        +'shutdown_time_stamp = "'+obj.shutdown_time_stamp+'" ,working= "'+obj.working+'"  where id="'+row.id+'"';
                    db.run(sql,function(err){
                        if(!err){
                            // console.log("已更新本次计算机运行日志");
                        }else{
                            throw err;
                        }
                    });
                }else{
                    //否则视为 又一次开机记录，执行插入
                    var sql = base.createsql_add(obj,"computerBootLog");//生成新增SQL
                    db.run(sql,function(err){//直接执行插入
                        if(!err){
                            // console.log("已插入本次计算机运行日志");
                        }else{
                            throw err;
                        }
                    });
                }
            }else{//系统初始运行，没有运行记录。
                var sql = base.createsql_add(obj,"computerBootLog");//生成新增SQL
                db.run(sql,function(err){//直接执行插入
                    if(!err){
                        // console.log("系统初始化，插入计算机运行日志。");
                    }else{
                        throw err;
                    }
                });
            }
        }
        db.close();
    });
}
