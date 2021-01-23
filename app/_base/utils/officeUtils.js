var officegen = require('officegen');
var fs = require('fs');
var path = require('path');
var docx = officegen ( 'docx' );
var async = require('async');

/**
 * 导出word
 */
// exports.exportWord = function(req, res) {
console.log('exportWord-------------');
docx.on ( 'finalize', function ( written ) {
	console.log ( 'Finish to create Word file.\nTotal bytes created: ' + written + '\n' );
});

docx.on ( 'error', function ( err ) {
	console.log ( err );
});

var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
pObj.addText ( '血液透析（滤过）治疗知情同意书', { bold: true,font_face: 'Arial', font_size: 18 });// 添加文字 设置字体样式 加粗 大小

var pObj = docx.createP ();
pObj.addText ( "测试哈哈" );
pObj.addText ( ' with color', { color: '000088' } );// 设置字体颜色
pObj.addText ( '性别' );
pObj.addText ( '', { color: '00ffff', back: '000088' } );
pObj.addText ( '年龄' );
pObj.addText ( '岁', { color: '000088' } );

var pObj = docx.createP ();
pObj.addText ( '门诊（住院）号' );
pObj.addText ( ' with color', { color: '000088' } );
pObj.addText ( '诊断' );
pObj.addText ( '', { color: '000088'} );

var pObj = docx.createP ();
pObj.addText ( '一、血液透析（滤过）能有效清除身体内过多的水分合霉素，是治疗急性和慢性肾衰竭等疾病的有效方法。' );
var pObj = docx.createP ();
pObj.addText ( '二、血液透析（滤过）治疗时，首先需要将患者血液引到体外，然后通过透析或滤过等方法清除水分和霉素，经受理后的血液再回到患者体外。' );
var pObj = docx.createP ();
pObj.addText ( '三、为了有效引出血液，治疗前需要建立血管通路（动静脉内痿或深静脉插管）。' );
var pObj = docx.createP ();
pObj.addText ( '四、为防止血液在体外管路和透析器发生凝固，一般需要在透析前和透析过程中注射肝素等抗凝药物。' );
var pObj = docx.createP ();
pObj.addText ( '五、血透过程中和治疗期间存在下列医疗风险，可能造成严重后果，甚至危及生命：' );
var pObj = docx.createP ();
pObj.addText ( '1.低血压，心力衰竭，心肌梗塞，心律失常，脑血管意外；' );
var pObj = docx.createP ();
pObj.addText ( '2.空气球栓塞；' );
var pObj = docx.createP ();
pObj.addText ( '我很帅的哈哈哈哈！我很帅！' , { font_face: 'Symbol', font_size: 20 } );

var out = fs.createWriteStream ( 'out1.docx' );// 文件写入
out.on ( 'error', function ( err ) {
    console.log ( err );
});

var result = docx.generate (out);// 服务端生成word
console.log("result");
console.log(result);
 
 
 
 
// }
