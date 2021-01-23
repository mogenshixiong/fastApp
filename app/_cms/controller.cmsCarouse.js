const bodyParser = require('body-parser');//接受传参的库
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const dbUtils = require("../_base/utils/dbUtils");
const resCode = require('../_base/const/responseCode');
const sqliteDbPath = process.cwd()+"/db/base.db";//打包后数据库文件挂载在包外
var multer = require('multer');
var path = require('path');
var fs = require("fs");
const uuid = require('node-uuid');

var upload = multer({ //上传图标文件配置
  storage: multer.diskStorage({
    destination: path.join(process.cwd(),'./file/upload/cmsCarouse'), //存储路径
    filename: function (req, file, cb) { //设置临时文件名称
      let extName = file.originalname.slice(file.originalname.lastIndexOf('.'))
      let fileName = uuid.v1();
      cb(null, fileName + extName);
    }
  }),
  fileFilter: function (req, file, cb) { //设置过来规则
    //https://www.w3school.com.cn/media/media_mimeref.asp
    var acceptableMime = ['image/x-icon','image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/jfif','image/svg+xml'];//支持文件类型
    if (acceptableMime.indexOf(file.mimetype) !== -1) {
      cb(null, true) //允许上传
    } else {
      // cb(null, false) //不允许上传
      cb(null, true) //允许上传
    }
  },
  limits: {
    fieldSize: '2MB' //最大上传限制
  }
}).single('file');  //最大数量限制 表单name属性

module.exports = function (app) {
  
  //上传轮播图
  app.post('/uploadCmsCarouse', upload, (req, res) => {
    if (req.file) {
      fs.readFile(req.file.path, async (err, data) => {
        res.json({ 
          code: resCode.SUCCESS,
          path: "file"+req.file.path.split("file")[1],
        });
      });
    } else {
      res.json({ code: resCode.ERROR });//上传失败
    }
  });

  //查询所有cms轮播
  app.post('/findAllCmsCarouse', urlencodedParser, async(req, res) => {
    var navList = await dbUtils.findAll(sqliteDbPath,"sys_cmsCarouse","Order By sort ASC");
    res.json({
      code: resCode.SUCCESS ,
      data: navList,
      msg: '查询成功'
    });
  });
  //查询CMS轮播
  app.post('/findCmsCarouseById', urlencodedParser, async(req, res) => {
    var userEntity = await dbUtils.findById(sqliteDbPath,"sys_cmsCarouse",req.body.id);
    res.json({ code: resCode.SUCCESS ,data : userEntity});
  });
  //新增&编辑cms轮播
  app.post('/saveCmsCarouseById', urlencodedParser, async(req, res) => {
    var obj = req.body;
    if( req.body.id === undefined ||  req.body.id.trim() == "" ){
      await dbUtils.add(sqliteDbPath,"sys_cmsCarouse",obj);
    }else{
      await dbUtils.updateById(sqliteDbPath,"sys_cmsCarouse",obj);
    }
    res.json({ code: resCode.SUCCESS});
    saveCmsCarouses();
  });
  //删除cms轮播
  app.post('/deleteCmsCarouseById', urlencodedParser, async(req, res) => {
    await dbUtils.deleteById(sqliteDbPath,"sys_cmsCarouse",req.body.id);
    res.json({ code: resCode.SUCCESS});
    saveCmsCarouses();
  });

  //保存到内存中
  async function saveCmsCarouses(){
    global.cmsCarouses = await dbUtils.findAll(sqliteDbPath,"sys_cmsCarouse","Order By sort ASC");;
  }
}