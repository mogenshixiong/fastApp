const nodemailer = require('nodemailer');
// https://nodemailer.com/about/ 
const isEmail = require('../tool/validate').isEmail;

// 开启一个 SMTP 连接池
let transporter;
if(global.password.ndemailderOptionPass != undefined && 
  global.password.ndemailderOptionPass != '' &&
  global.config.email != undefined && 
  global.config.email != '') {
  // global.nodemailerOptionsConfig
  transporter = nodemailer.createTransport({
    "host": "smtp.qq.com",
    "secureConnection": true,
    "port": 465,
    "secure": true,
    "auth": {
      "user": global.config.email,
      "pass": global.password.ndemailderOptionPass,
    }
  })
}else {
  console.log("未配置邮件授权码，如果需要使用邮件发送功能，请在config/password.json文件中增加配置：\"ndemailderOptionPass\":\"*****\"。");
}
function sendMailAsync(mailOptions){
  mailOptions.from = '"摩根师兄" <mogenshixiong@qq.com>'; // 发件人

  // 使用先前创建的传输器的 sendMail 方法传递消息对象
  return new Promise( (resolve, reject) => {
    if( v(mailOptions) == false ){
      reject('validate false');
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("邮件模块错误");
        reject(error);
      }else{
        resolve(info);
      }
    });
  })
}
function v(mailOptions){
  if(!mailOptions.to || !mailOptions.subject || !mailOptions.text || !mailOptions.html){
    console.log('邮件发送数据缺项');
    return false;
  }

  const emails = mailOptions.to.split(',');
  for( var i=0;i< emails.length; i++){
    if( isEmail(emails[i]) == false){
      console.log('收件人邮件格式有误');
      return false;
    }
  }
  
  return true;
}

/**
 * @param { to } 收件人 1@qq.com,2@qq.com
 * @param { subject } 主题
 * @param { text } plain text body
 * @param { html } html body  
 * @param { attachments } html 附件 [{filename, path}] 
 */
module.exports.sendMailAsync = sendMailAsync;

// sendMailAsync({
//   to: 'mogenshixiong@qq.com',
//   subject: 'test',
//   text: '正文内容',
//   html: '<strong>正文内容</strong>'
// })