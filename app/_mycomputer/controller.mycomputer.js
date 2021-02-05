var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const service = require("./service.mycomputer");
const folderUtils = require('../_base/utils/folderUtils');
const resCode = require('../_base/const/responseCode');
const base = require('../_base/utils/base');

module.exports = function (app) {
  app.post('/getFolderNodeList', urlencodedParser, async (req, res) => {
    let path = req.body.path;
    if( path == 'C:' ||path == 'C:\\' || path == 'C:\\\\'){
      res.json({ code: resCode.ERROR, msg: 'C盘就算了吧，太大了。电脑会跑死的！'});
      res.end();
    }
    let result = {
      meta:{
        name: "jsMind-demo-tree",
        author: "鬼知道谁写的，不是很好用。凑合吧！我还得自己调样式",
        version: "v1.0"
      },
      format: "node_tree",
    }
    result.data = service.getFolderNode( path );

    res.json({ code: resCode.SUCCESS, data: result});
  });

  //!打开本地应用||文件夹||文件
  app.post('/open', urlencodedParser, async (req, res) => {
    base.open(req.body.path);
    res.json({ code: resCode.SUCCESS });
  });
}