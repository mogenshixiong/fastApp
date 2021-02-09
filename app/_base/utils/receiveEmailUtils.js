var Imap = require('imap');
var MailParser = require("mailparser").MailParser
var fs = require('fs'), fileStream;
const {writeErrorLog} = require('./logUtils');

let receiveEmailResolve;
let receiveEmailReject;
let emailList =[];
var imap = new Imap({
    user: 'mogenshixiong@qq.com', //你的邮箱账号
    password: global.password.ndemailderOptionPass, //你的邮箱密码
    host: 'imap.qq.com', //邮箱服务器的主机地址
    port: 993, //邮箱服务器的端口地址
    tls: true, //使用安全传输协议
    tlsOptions: { rejectUnauthorized: false } //禁用对证书有效性的检查
});
function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
  openInbox(function(openInboxErr, box) { 
    if (openInboxErr) {
      writeErrorLog( openInboxErr );
      throw openInboxErr;
    }else {
      // console.log("邮箱连接成功，开始读取邮件...");
    }
    //查询邮件
    imap.search([ 'SEEN', ['SINCE', 'December 20, 2020'] ], function(imapSearchErr, results) {
      if (imapSearchErr) {
        writeErrorLog( imapSearchErr );
        imap.end();
        receiveEmailReject( imapSearchErr );
        return;
      };
      // console.log(`发现${results.length}条邮件`);
      if(results.length == 0){
        imap.end();
        receiveEmailResolve(results);
        return;
      }

      emailList =[];
      var f = imap.fetch(results, { bodies: ''});
      f.on('message', async function(msg, seqno) {
        let email = await getEmailAsync(msg, seqno); // 逐条获取邮件
        emailList.push(email);
        if( emailList.length == results.length ){ // 获取完毕
          receiveEmailResolve( emailList);
        }
      });

      f.once('error', function(err) {
        // console.log('拉取出现错误: ' + err);
        imap.end(); 
        receiveEmailReject(err); 
      });
      f.once('end', function() {
        //console.log('邮件读取完成!');
        imap.end(); 
      });
    });
  });
});

imap.once('error', function(err) {
  console.log(`链接失败，${err.message}。1分钟后将重新链接。`);
  setTimeout(function(){
    asyncEmail();
  },1000*60);
});

imap.once('end', function() {
  // console.log('关闭邮箱');
  receiveEmailResolve("");
});

function receiveEmail(){
  return new Promise((resolve, reject) => {
    receiveEmailResolve = resolve;
    receiveEmailReject = reject;
    imap.connect(); // 开始同步邮件数据
  })
}

//逐条获取邮件
function getEmailAsync(msg, seqno){
  return new Promise((resolve, reject)=>{
    var mailparser = new MailParser();
    msg.on('body', async function(stream, info) {
      let email = await packMsgAsync(stream, info, mailparser);
      resolve(email);
    });
    msg.once('attributes', function(attrs) {
      // console.log(seqno + 'Attributes: %s', inspect(attrs, false, 8));
    });
    msg.once('end', function() {
      // console.log(`序号: ${seqno}邮件读取完成`);
    });
  })
}

function packMsgAsync(stream, info, mailparser){
  return new Promise((resolve , reject) => {
    let email = {};
    stream.pipe(mailparser); //将为解析的数据流pipe到mailparser
    // 获取邮件头内容
    mailparser.on("headers", function(headers) {
      email.subject = headers.get('subject'); //邮件主题
      email.from = headers.get('from') ? headers.get('from').text : ''; // 发件人
      email.to = headers.get('to') ? headers.get('to').text : ''; // 收件人
      
    });
    // 获取邮件正文内容
    mailparser.on("data", function(data) {
      if (data.type === 'text') {
        email.text = data.html; //邮件正文
      }
      if (data.type === 'attachment') {
        email.attachment = data.filename; //附件名称
        // data.content.pipe(fs.createWriteStream(data.filename));//下载附件到当前目录下
        // data.release();
      }
      resolve(email);
    });
  })
}

//==================================================
async function test() {
  console.log("同步执行获取邮件列表：开始");
  var res = await receiveEmail();
  console.log(res);
  console.log("同步执行获取邮件列表：结束");
}
test();