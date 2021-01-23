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
    destination: path.join(process.cwd(),'./file/upload/cmsArticleCover'), //存储路径
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
    //上传封面
    app.post('/uploadCmsCover', upload, (req, res) => {
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

    //查询所有cms文章分页
    app.post('/findCmsArticleByPage', urlencodedParser, async(req, res) => {
        var param = {
            pageNum:req.body.page ,
            pageSize: req.body.limit
        };
        var list = await dbUtils.findByPage(sqliteDbPath,"sys_cmsArticle",param, "Order By sort ASC");
        var count = await dbUtils.getCount(sqliteDbPath,"sys_cmsArticle");
        res.json({
            code: resCode.SUCCESS ,
            data: list,
            count: count,
            msg: '查询成功'
        });
    });
    //查询CMS文章
    app.post('/findCmsArticleById', urlencodedParser, async(req, res) => {
        var entity = await dbUtils.findById(sqliteDbPath,"sys_cmsArticle",req.body.id);
        res.json({ code: resCode.SUCCESS ,data : entity});
    });
    //新增&编辑cms文章
    app.post('/saveCmsArticleById', urlencodedParser, async(req, res) => {
        var obj = req.body;
        if( req.body.id === undefined ||  req.body.id.trim() == "" ){
            await dbUtils.add(sqliteDbPath,"sys_cmsArticle",obj);
        }else{
            await dbUtils.updateById(sqliteDbPath,"sys_cmsArticle",obj);
        }
        res.json({ code: resCode.SUCCESS});
        saveCmsArticle();
    });
    //删除cms文章
    app.post('/deleteCmsArticleById', urlencodedParser, async(req, res) => {
        await dbUtils.deleteById(sqliteDbPath,"sys_cmsArticle",req.body.id);
        res.json({ code: resCode.SUCCESS});
        saveCmsArticle();
    });

    //保存到内存中
    async function saveCmsArticle(){
        global.cmsArticle = await dbUtils.getArticleList();
    }
}