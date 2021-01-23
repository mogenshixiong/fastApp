//定时器
const schedule = require('node-schedule');
const nodeTimer = {};
let cancelTimer = ''

nodeTimer.scheduleTimer = (executionTime = '30 * * * * *', callback) => {
    // 每分钟的第30秒触发： '30 * * * * *'
    // 每小时的1分30秒触发 ：'30 1 * * * *'
    // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
    // 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
    // 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
    // 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
    //语法参考
    // https://blog.csdn.net/ahltg62444/article/details/101908011
    cancelTimer = schedule.scheduleJob(executionTime, () => {
        if (typeof callback === 'function') {
            callback()
        }
    });

}
// 取消定时器
// 调用 定时器对象的cancl()方法即可
nodeTimer.scheduleCancel = () => {
    // 定时器取消
    cancelTimer.cancel();
    console.log('定时器成功取消');
}
module.exports = nodeTimer;