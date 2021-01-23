const bodyParser = require('body-parser');//接受传参的库
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const dbUtils = require("../_base/utils/dbUtils");
const resCode = require('../_base/const/responseCode');
const sqliteDbPath = process.cwd()+"/db/base.db";//打包后数据库文件挂载在包外

module.exports = function (app) {

    //查询所有cms导航
    app.post('/findAllCmsNav', urlencodedParser, async(req, res) => {
        var navList = await dbUtils.findAll(sqliteDbPath,"sys_cmsNav","Order By sort ASC");
        res.json({
            code: resCode.SUCCESS ,
            data: navList,
            msg: '查询成功'
        });
    });
    //查询CMS导航
    app.post('/findCmsNavById', urlencodedParser, async(req, res) => {
        var userEntity = await dbUtils.findById(sqliteDbPath,"sys_cmsNav",req.body.id);
        res.json({ code: resCode.SUCCESS ,data : userEntity});
    });
    //新增&编辑cms导航
    app.post('/saveCmsNavById', urlencodedParser, async(req, res) => {
        var obj = req.body;
        if( req.body.id === undefined ||  req.body.id.trim() == "" ){
            await dbUtils.add(sqliteDbPath,"sys_cmsNav",obj);
        }else{
            await dbUtils.updateById(sqliteDbPath,"sys_cmsNav",obj);
        }
        res.json({ code: resCode.SUCCESS});
        saveCmsNav();
    });
    //删除cms导航
    app.post('/deleteCmsNavById', urlencodedParser, async(req, res) => {
        await dbUtils.deleteById(sqliteDbPath,"sys_cmsNav",req.body.id);
        res.json({ code: resCode.SUCCESS});
        saveCmsNav();
    });

    //保存到内存中
    async function saveCmsNav(){
        var allNav = await dbUtils.findAll(sqliteDbPath,"sys_cmsNav","Order By sort ASC");
        global.cmaNavs = allNav;
    }
}