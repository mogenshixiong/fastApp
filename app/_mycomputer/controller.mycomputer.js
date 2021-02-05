var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const service = require("./service.mycomputer");
const folderUtils = require('../_base/utils/folderUtils');
const resCode = require('../_base/const/responseCode');

module.exports = function (app) {
  app.post('/getFolderNodeList', urlencodedParser, async (req, res) => {
    let path = req.body.path;

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

  app.post('/openFolder', urlencodedParser, async (req, res) => {
    let path = req.body.path;
    folderUtils.openFolder(path)
    res.json({ code: resCode.SUCCESS });
  });
}