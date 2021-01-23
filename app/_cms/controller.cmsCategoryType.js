const bodyParser = require('body-parser');//接受传参的库
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const dbUtils = require("../_base/utils/dbUtils");
const resCode = require('../_base/const/responseCode');
const sqliteDbPath = process.cwd()+"/db/base.db";//打包后数据库文件挂载在包外

module.exports = function (app) {

  //查询所有cms栏目
  app.post('/findAllCmsCategoryType', urlencodedParser, async(req, res) => {
    var list = await dbUtils.findAll(sqliteDbPath,"sys_cmsCategoryType","Order By sort ASC");
    res.json({
      code: resCode.SUCCESS ,
      data: list,
      msg: '查询成功'
    });
  });
  //查询CMS栏目
  app.post('/findCmsCategoryTypeById', urlencodedParser, async(req, res) => {
    var entity = await dbUtils.findById(sqliteDbPath,"sys_cmsCategoryType",req.body.id);
    res.json({ code: resCode.SUCCESS ,data : entity});
  });
  //新增&编辑cms栏目
  app.post('/saveCmsCategoryTypeById', urlencodedParser, async(req, res) => {
    var obj = req.body;
    if( req.body.id === undefined ||  req.body.id.trim() == "" ){
      await dbUtils.add(sqliteDbPath,"sys_cmsCategoryType",obj);
    }else{
      await dbUtils.updateById(sqliteDbPath,"sys_cmsCategoryType",obj);
    }
    res.json({ code: resCode.SUCCESS});
    saveCmsCarouses();
  });
  //删除cms栏目
  app.post('/deleteCmsCategoryTypeById', urlencodedParser, async(req, res) => {
    await dbUtils.deleteById(sqliteDbPath,"sys_cmsCategoryType", req.body.id);
    res.json({ code: resCode.SUCCESS});
    saveCmsCarouses();
  });

  //保存到内存中
  async function saveCmsCarouses(){
    global.cmsCategoryType = await dbUtils.findAll(sqliteDbPath, "sys_cmsCategoryType", "Order By sort ASC");;
  }
}