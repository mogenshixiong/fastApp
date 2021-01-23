var solr = require('solr-client');
var BASECOUNT = require('../const/baseConst');
var format = require('../common/format');
var tool = require('../tool/tool')

//执行数据清洗任务
async function clean(solrTaskEntity,option,res){
    var client = solr.createClient(option);
    var query = {q: solrTaskEntity.query,start: 0,rows: 10000*300,fl:"id"};
    var queryResult = await client.searchAsync(query);
    var idList = queryResult.response.docs;//获取所有待处理的数据ID
    var ruleList = solrTaskEntity.function.split(";");
    ruleList = tool.filterArrayEmptyValues( ruleList );
    doCleanByIdList(idList,ruleList,client,res,0); //递归清洗
}
async function doCleanByIdList(idList,ruleList,client,res,count){
    if(idList[0]){
        var queryResult = await client.searchAsync({q:`id:${idList[0].id}`});//执行获取完整数据
        queryResult = queryResult.response.docs[0];
        queryResult.create_user_name = "mogenshixiong";
        if(!queryResult.auto_stringITSV_title){
            queryResult.auto_stringITSV_title = "默认标题";
        }
        delete queryResult.copyTitle ;
        delete queryResult._version_ ;
        client.add(queryResult,function(err , data) {
            if(!err){
                if(idList.length > 0){
                    doCleanByIdList(idList.slice(1,idList.length),ruleList,client,res,count++);//递归
                }
            }else{
                var result = format.newResult();
                result.msg = err.message;
                result.msg1 = "未完成数据"+idList.length;
                result.msg2 = "已完成数据"+count;
                result.data = queryResult;
                result.code = BASECOUNT.ERROR;
                res.json(result);
            }
        });
    }else{
        var result = format.newResult();
        result.msg = "执行完成";
        res.json(result);
    }
}

//单条数据原子更新
async function saveField(query,option,res, req){
    var client = solr.createClient(option);
    var query = {q: query, start: 0, rows: 10, fl:"id"};
    var queryResult = await client.searchAsync(query);
    var idList = queryResult.response.docs;//获取所有待处理的数据ID
    var ruleList = solrTaskEntity.function.split(";");
    ruleList = tool.filterArrayEmptyValues( ruleList );
    doCleanByIdList(idList,ruleList,client,res,0); //递归清洗
}
module.exports.saveField = saveField;//单条数据原子更新
module.exports.clean = clean;//执行清洗
//前台点击时 最好给进度提示。错误提示详情，方便调试。