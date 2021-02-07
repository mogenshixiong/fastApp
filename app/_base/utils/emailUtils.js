const nodemailer = require('nodemailer');
// https://nodemailer.com/about/ 
const validate = require('../tool/validate');

// 开启一个 SMTP 连接池
let transporter = nodemailer.createTransport(global.nodemailerOptionsConfig);

function sendMailAsync(mailOptions){
  mailOptions.from = '"摩根师兄" <mogenshixiong@qq.com>'; // 发件人

  // 使用先前创建的传输器的 sendMail 方法传递消息对象
  return new Promise( (resolve, reject) => {
    if( v(mailOptions) == false ){
      reject('validate false');
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
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
    if( validate.isEmail(emails[i]) == false){
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
module.exports.sendMailAsync = sendMailAsync; //to