var child = require('child_process');
const exec = require('child_process').execSync;
var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var xlsx = require('node-xlsx');

module.exports = function (app) {
    
    app.get('/attendance/list/list', function (req, res) {
        res.render('attendance/list/list');
    });

    app.post('/parseAttendanceFile', urlencodedParser, async (req, res) => {
        var sheets = xlsx.parse('./'+req.body.path);// 解析得到文档中的所有 sheet
        sheets.forEach(function(sheet){// 遍历 sheet
            if(sheet['name'] == "刷卡记录"){//只解析【刷卡记录】sheet
                for(var rowId in sheet['data']){// 读取每行内容
                    if(rowId < 2){//1-2行是表头，不解析
                        continue;
                    }else if(rowId == 2){//解析当前考勤表日期
                        var row=sheet['data'][rowId];
                        var date = row[row.length-1].split(" ~ ");
                        
                        var dateBegin = date[0].split("/");
                        dateBegin = Number(dateBegin[dateBegin.length -1]);

                        var dateEnd = date[1].split("/");
                        dateEnd = Number(dateEnd[dateEnd.length -1]);

                        console.log(dateBegin);
                        console.log(dateEnd);
                    }else if(rowId == 5){
                        var row=sheet['data'][rowId];
                        console.log(row);
                        console.log(row.length);
                        console.log(row[3]);
                        console.log(row[4]);
                        console.log(row[5]);
                    }else{
                       
                    }
                }
            }
            
        });
    });

}