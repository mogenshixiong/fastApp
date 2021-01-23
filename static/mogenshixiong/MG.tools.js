MG.tools = {
  sizeof, // 计算字节
  debounce, // 防抖函数
  ToHtmlString, // Html结构转字符串形式显示
  toTXT, // Html结构转字符串形式显示
  handle_bit, // 字节转KB或MB或G
  getDomainName, // 根据url 获取domain中间的name
  tool_windowOpenUrl, // 打开url ，判断本地文件时使用node打开
  tool_openComputerAppByPath, // 调用本地应用程序
  tool_splitByEnter, // 根据换行符切割字符串
  tool_checkFormat, // 图片下载器=检查图片格式是否合法
  tool_checkPath, // 图片下载器=检查下载路径是否合法
  setLayerOpenOffset, // 设置layui弹出层的位置，使用时在弹出层打开后调用。
  openLayer, // 首页中心通过弹出层方法 返回当前弹出层索引值
  copyText, // 复制文本
  utc2beijing, // UTC时间转北京时间
  setWallpaper, // 设置必应壁纸
  removeHTMLTag, //获取html代码的纯文本
  isInteger, //判断是否是整数。
  getQueryString, //获取URL中参数
  changeURLArg, //修改url的参数 // https://www.cnblogs.com/ziyoublog/p/9776764.html
  getHost, //原生JavaScript获取域名主机
  getUrlState, //原生JavaScript检验URL链接是否有效
  _ip2int, //原生JavaScriptIP转成整型
  _int2iP, //原生JavaScript整型解析为IP地址
  notEmpty, //判断某对象不为空..返回obj 否则 ""
  notNull, //判断某对象不为空..返回true 否则 false
  deepClone, //深拷贝：使用变量 a 拷贝对象 b，改变 a 中的值 b 中的值也会跟着改变，这叫做浅拷贝。要想让 a 独立于 b 就需要深拷贝
  cutstr, //字符串长度截取
  isDigit, //原生JavaScript判断是否为数字类型
  setCookie, //原生JavaScript设置cookie值
  getCookie, //原生JavaScript获取cookie值
  LoadStyle, //原生JavaScript加载样式文件
  evalscript, //原生JavaScript返回脚本内容
  stripscript, //原生JavaScript清除脚本内容
  insertAfter, //原生JavaScript中有insertBefore方法,可惜却没有insertAfter方法?用如下函数实现
  formatCss, //原生JavaScript格式化CSS样式代码
  yasuoCss, //原生JavaScript压缩CSS样式代码
  getUuid, //生成随机ID
  removeDuplicationByArr,
}
function isIe9(){
  if(navigator.userAgent.indexOf("MSIE")>0){
		if(navigator.userAgent.indexOf("MSIE 9.0")>0){
      return true;
    }
  }
  return false;
}
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
};
function changeURLArg(url, arg, arg_val) {
  var pattern = arg + '=([^&]*)';
  var replaceText = arg + '=' + arg_val;
  if (url.match(pattern)) {
    var tmp = '/(' + arg + '=)([^&]*)/gi';
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match('[\?]')) {
      return url + '&' + replaceText;
    } else {
      return url + '?' + replaceText;
    }
  }
}
function getHost(url) {
  var host = "null";
  if (typeof url == "undefined" || null == url) {
    url = window.location.href;
  }
  var regex = /^\w+\:\/\/([^\/]*).*/;
  var match = url.match(regex);
  if (typeof match != "undefined" && null != match) {
    host = match[1];
  }
  return host;
}
function getUrlState(URL) {
  var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
  xmlhttp.Open("GET", URL, false);
  try {
    xmlhttp.Send();
  } catch (e) {} finally {
    var result = xmlhttp.responseText;
    if (result) {
      if (xmlhttp.Status == 200) {
        return (true);
      } else {
        return (false);
      }
    } else {
      return (false);
    }
  }
}
function _ip2int(ip) {
  var num = 0;
  ip = ip.split(".");
  num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
  num = num >>> 0;
  return num;
}
function _int2iP(num) {
  var str;
  var tt = new Array();
  tt[0] = (num >>> 24) >>> 0;
  tt[1] = ((num << 8) >>> 24) >>> 0;
  tt[2] = (num << 16) >>> 24;
  tt[3] = (num << 24) >>> 24;
  str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
  return str;
}
function notEmpty(obj) {
  if (obj === null) return "";
  else if (obj === undefined) return "";
  else if (obj === "undefined") return "";
  else if (obj === "") return "";
  else if (obj === "[]") return "";
  else if (obj === "{}") return "";
  else return obj;
};
function notNull(obj) {
  if (obj === null) return false;
  else if (obj === undefined) return false;
  else if (obj === "undefined") return false;
  else if (obj === "") return false;
  else if (obj === "[]") return false;
  else if (obj === "{}") return false;
  else if (obj.trim() === "") return false;
  else return true;
};
function deepClone(obj) {
  function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
  }
  var result;
  var oClass = isClass(obj);
  if (oClass === "Object") {
    result = {};
  } else if (oClass === "Array") {
    result = [];
  } else {
    return obj;
  }
  for (var key in obj) {
    var copy = obj[key];
    if (isClass(copy) == "Object") {
      result[key] = arguments.callee(copy); /*递归调用*/
    } else if (isClass(copy) == "Array") {
      result[key] = arguments.callee(copy);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
function cutstr(str, len) {
  var temp;
  var icount = 0;
  var patrn = /[^\x00-\xff]/;
  var strre = "";
  for (var i = 0; i < str.length; i++) {
    if (icount < len - 1) {
      temp = str.substr(i, 1);
      if (patrn.exec(temp) == null) {
        icount = icount + 1;
      } else {
        icount = icount + 2;
      }
      strre += temp;
    } else {
      break;
    }
  }
  return strre + "..."
}
function isDigit(value) {
  var patrn = /^[0-9]*$/;
  if (patrn.exec(value) == null || value == "") {
    return false
  } else {
    return true
  }
}
function setCookie(name, value, Hours) {
  var d = new Date();
  var offset = 8;
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = utc + (3600000 * offset);
  var exp = new Date(nd);
  exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null
}
function LoadStyle(url) {
  try {
    document.createStyleSheet(url)
  } catch (e) {
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(cssLink)
  }
}
function evalscript(s) {
  if (s.indexOf('<script') == -1) return s;
  var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
  var arr = [];
  while (arr = p.exec(s)) {
    var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
    var arr1 = [];
    arr1 = p1.exec(arr[0]);
    if (arr1) {
      appendscript(arr1[1], '', arr1[2], arr1[3]);
    } else {
      p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
      arr1 = p1.exec(arr[0]);
      appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
    }
  }
  return s;
}
function stripscript(s) {
  return s.replace(/<script.*?>.*?<\/script>/ig, '');
}
function insertAfter(newChild, refChild) {
  var parElem = refChild.parentNode;
  if (parElem.lastChild == refChild) {
    refChild.appendChild(newChild);
  } else {
    parElem.insertBefore(newChild, refChild.nextSibling);
  }
}
function formatCss(s) {
  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
  s = s.replace(/;\s*;/g, ";"); /*清除连续分号*/
  s = s.replace(/\,[\s\.\#\d]*{/g, "{");
  s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
  s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
  s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
  return s;
}
function yasuoCss(s) {
  s = s.replace(/\/\*(.|\n)*?\*\//g, ""); /*删除注释*/
  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
  s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); /*容错处理*/
  s = s.replace(/;\s*;/g, ";"); /*清除连续分号*/
  s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); /*去掉首尾空白*/
  return (s == null) ? "" : s[1];
}

//设置layui弹出层的位置，使用时在弹出层打开后调用。
//以及需要在父页面窗体大小改变时调用。
//因为父页面窗体大小改变时会重置lauyui弹出层位置。
// demo:
// setLayerOpenOffset(index,left,top)
// parent.$(window).resize(function () {
//   setLayerOpenOffset(index,left,top)
// });
function setLayerOpenOffset(index,left,top){
  layer.style(index, {
    left: left,
    top: top
  });
}

//首页中心通过弹出层方法
//返回当前弹出层索引值
function openLayer(url,title){
  var index = layer.open({
    id: 'indexCommon',
    anim: 0,
    type: 2,
    area: ['90%', '90%'],//宽高
    title: title,
    closeBtn: 1,
    resize: false,
    move: false,
    shade: [0.3, 'white'],
    shadeClose: true,
    skin: 'layui-layer-myClass',
    content: url
  });
  return index;
}
//复制文本
function copyText(text) {
	var textarea = document.createElement("input");//创建input对象
	var currentFocus = document.activeElement;//当前获得焦点的元素
	document.body.appendChild(textarea);//添加元素
	textarea.value = text;
	textarea.focus();
	if(textarea.setSelectionRange)
		textarea.setSelectionRange(0, textarea.value.length);//获取光标起始位置到结束位置
	else
		textarea.select();
	try {
		var flag = document.execCommand("copy");//执行复制
	} catch(eo) {
		var flag = false;
	}
	document.body.removeChild(textarea);//删除元素
	currentFocus.focus();
	return flag;
}


//UTC时间转北京时间
function utc2beijing(utc_datetime) {
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf('T');
  var Z_pos = utc_datetime.indexOf('Z');
  var year_month_day = utc_datetime.substr(0,T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
  var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06
 
  // 处理成为时间戳
  timestamp = new Date(Date.parse(new_datetime));
  timestamp = timestamp.getTime();
  timestamp = timestamp/1000;
 
  // 增加8个小时，北京时间比utc时间多八个时区
  var timestamp = timestamp+8*60*60;
 
  // 时间戳转为时间
  var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  // console.log(new Date(parseInt(timestamp) * 1000).Format("yyyy-MM-dd hh:mm:ss"));
  return new Date(parseInt(timestamp) * 1000).Format("yyyy-MM-dd hh:mm:ss"); // 2017-03-31 16:02:06
}
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,         //月份
    "d+" : this.getDate(),          //日
    "h+" : this.getHours(),           //小时
    "m+" : this.getMinutes(),         //分
    "s+" : this.getSeconds(),         //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()       //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
//设置必应壁纸
function setWallpaper(){
  var url = "url('static/wallpaper/bing/"+new Date().Format("yyyyMMdd")+".jfif')"
  document.getElementById('backgroundImageId').style.backgroundImage = url;
}
// 获取html代码的纯文本
function removeHTMLTag(str){
  str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
  //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
  str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
  str=str.replace(/\s/g,''); //将空格去掉
  return str;
}
//判断是否是整数。
function isInteger(obj) {
  return obj%1 === 0
}

//图片下载器=检查下载路径是否合法
function tool_checkPath( path ){
  var list = path.split("/");
  var reg =  /\W/; // \w : 数字，字母 ，下划线 0-9 a-z A-Z _ \W : 除了\w
  for(var i=0;i<list.length;i++){
    if( reg.test(list[i]) ){
      return false;
    }
  }
  return true;
}
//图片下载器=检查图片格式是否合法
function tool_checkFormat(format){
  var list = format.split(";");
  var reg =  /[^a-z]/; // 格式只能输入字母
  for(var i=0;i<list.length;i++){
    if( reg.test(list[i]) ){
      return false;
    }
  }
  return true;
}
//根据换行符切割字符串
function tool_splitByEnter(str){
  var snsArr = str.split(/[(\r\n)\r\n]+/);
  snsArr.forEach((item,index)=>{
    if(!item){
      snsArr.splice(index,1);//删除空项
    }
  })
  return snsArr;
}


//调用本地应用程序
function tool_openComputerAppByPath(url){
  if( url == ""){
    layer.msg("程序路径不能为空");
    return;
  }
  $.ajax({
    type: 'POST',
    url: '/openComputerAppByPath',
    data: {url:decodeURI(url)},
    success: function (data) {
      if(data.code == 1){
        //console.log(data);
      }
    }
  });
}

function tool_windowOpenUrl( url ){
  if( url.indexOf("file:///F") == 0 ){
  //layer.msg("浏览器不允许开打本地文件");
  tool_openComputerAppByPath(url);
  }else{
  window.open(url);  
  }
}

function getDomainName(url){
  if( url.indexOf("file:///F") == 0 ){
    return null;
  }else{
    var domain = url.split('/'); //以“/”进行分割
    if( domain[2] ) {
      domain = domain[2];
      var domainName = domain.split(":")[0];
      domainName = domainName.replace("www.", "");

      domainName = domainName.replace(".com", "");
      domainName = domainName.replace(".cn", "");
      domainName = domainName.replace(".vip", "");
      domainName = domainName.replace(".org", "");
      domainName = domainName.replace(".net", "");
      domainName = domainName.replace(".top", "");
      domainName = domainName.replace(".cc", "");
      return domainName
    } else {
      domain = ''; //如果url不正确就取空
      return null;
    }
  }
}

function removeDuplicationByArr(arr){
  // 遍历arr，把元素分别放入tmp数组(不存在才放)
  var tmp = new Array();
  for(var i in arr){
    //该元素在tmp内部不存在才允许追加
    if(tmp.indexOf(arr[i])==-1){
    tmp.push(arr[i]);
    }
  }
  return tmp;
}

function handle_bit(bit){
  if(bit==0){
    return 0;
  }
  var kb = bit/1024;
  if( kb < 1024){
    return kb.toFixed(2)+"KB";
  }
  var mb = kb/1024;
  if(mb<1024){
    return mb.toFixed(2) + "MB";
  }

  var g = mb/1024;
  return g.toFixed(2)+"G";
}
function tool_timestampToDate(timestamp){
  return new Date(parseInt(timestamp) ).toLocaleString().replace(/:\d{1,2}$/,' ');
}


/**
* @desc 函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
* @param func 需要执行的函数
* @param wait 延迟执行时间（毫秒）
* @param immediate---true 表立即执行，false 表非立即执行
函数防抖其实是分为 “立即执行版” 和 “非立即执行版” 的，
根据字面意思就可以发现他们的差别，所谓立即执行版就是 触发事件后函数不会立即执行，
而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。 
而 “非立即执行版” 指的是 触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。。
**/
function debounce(func,wait,immediate) {
  let timer;
  
  return function () {
    let context = this;
    let args = arguments;
    
    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(() => {
      timer = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function(){
        func.apply(context, args)
      }, wait);
    }
  }
}
//Html结构转字符串形式显示
function toTXT(str) {
  var RexStr = /\<|\>|\"|\'|\&|　| /g
  str = str.toString().replace(RexStr,
  function (MatchStr) {
  switch (MatchStr) {
  case "<":
  return "<";
  break;
  case ">":
  return ">";
  break;
  case "\"":
  return '"';
  break;
  case "'":
  return "'";
  break;
  case "&":
  return "&";
  break;
  case " ":
  return " ";
  break;
  case "　":
  return " ";
  break;
  default:
  break;
  }
  }
  )
  return str;
}
function ToHtmlString(htmlStr) {
  return toTXT(htmlStr).replace(/\<\;br[\&ensp\;|\&emsp\;]*[\/]?\>\;|\r\n|\n/g, "<br/>");
}
/**
 * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
 * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
 *
 * 000000 - 00007F(128个代码)    0zzzzzzz(00-7F)               一个字节
 * 000080 - 0007FF(1920个代码)   110yyyyy(C0-DF) 10zzzzzz(80-BF)       两个字节
 * 000800 - 00D7FF
   00E000 - 00FFFF(61440个代码)  1110xxxx(E0-EF) 10yyyyyy 10zzzzzz       三个字节
 * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
 *
 * 注: Unicode在范围 D800-DFFF 中不存在任何字符
 *
 {@link <a 
  onclick="javascript:pageTracker._trackPageview('/outgoing/zh.wikipedia.org/wiki/UTF-8');"
   
  href="http://zh.wikipedia.org/wiki/UTF-8">http://zh.wikipedia.org/wiki/UTF-8</a>}
   *
   * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
   * 000000 - 00FFFF  两个字节
   * 010000 - 10FFFF  四个字节
   *
   *
   {@link <a 
  onclick="javascript:pageTracker._trackPageview('/outgoing/zh.wikipedia.org/wiki/UTF-16');"
   
  href="http://zh.wikipedia.org/wiki/UTF-16">http://zh.wikipedia.org/wiki/UTF-16</a>}
   * @param  {String} str
   * @param  {String} charset utf-8, utf-16
   * @return {Number}
   */
var sizeof = function(str, charset){
  var total = 0,
    charCode,
    i,
    len;
  charset = charset ? charset.toLowerCase() : '';
  if(charset === 'utf-16' || charset === 'utf16'){
    for(i = 0, len = str.length; i < len; i++){
      charCode = str.charCodeAt(i);
      if(charCode <= 0xffff){
        total += 2;
      }else{
        total += 4;
      }
    }
  }else{
    for(i = 0, len = str.length; i < len; i++){
      charCode = str.charCodeAt(i);
      if(charCode <= 0x007f) {
        total += 1;
      }else if(charCode <= 0x07ff){
        total += 2;
      }else if(charCode <= 0xffff){
        total += 3;
      }else{
        total += 4;
      }
    }
  }
  return total;
}
function getUuid(length){
  return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}
