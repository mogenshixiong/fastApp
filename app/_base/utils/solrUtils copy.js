var solr = require('solr-client');
var baseConst = require('../const/baseConst');
var format = require('../common/format');

//单条新增
// 新增时，需要注意必填项。如果没有会报错导致新增失败。
// solr 必填项 在xml里配置
//! 如何获取必填项信息，以提前做校验
exports.module.add = (optin,data)=>{
    try {
        var client = solr.createClient(optin);
        client.add( data ,function(err,obj){
            if(err){
                return format.formatReturn({
                    code : baseConst.ERROR_CODE,
                    msg : "插入失败，请检查数据格式，并确保参数正确。",
                    err: err
                })
            }else{
                return format.formatReturn({
                    code : baseConst.SUCCESS_CODE,
                    msg : "成功。",
                    data: obj
                });
            }
        });
    } catch (error) {
        return format.formatReturn({
            code : baseConst.ERROR_CODE,
            msg : "连接solr失败！请检查连接配置，并确保solr服务运行正常。",
            err: error
        });
    }
    
}

//条件查询
//query = 'id:"ee0f1790de1b4245b81d99b258a34e92"';
//查询条件为字符串，注意分号控制
exports.module.search =(optin , query) => {
    try {
        var client = solr.createClient(optin);
        client.search({q:query},function(err,obj){
            if(err){
                return format.formatReturn({
                    code : baseConst.ERROR_CODE,
                    msg : "错误",
                    err: err
                });
            }else{
                return format.formatReturn({
                    code : baseConst.SUCCESS_CODE,
                    msg : "成功。",
                    data: obj
                });
            }
         });
    } catch (error) {
        return format.formatReturn({
            code : baseConst.ERROR_CODE,
            msg : "连接solr失败！请检查连接配置，并确保solr服务运行正常。",
            err: error
        });
    }
}

//条件删除
//query = 'id:"ee0f1790de1b4245b81d99b258a34e92"';
exports.module.deleteByQuery =(optin , query) => {
    try {
        var client = solr.createClient(optin);
        client.deleteByQuery(query,function(err,obj){
            if(err){
                return format.formatReturn({
                    code : baseConst.ERROR_CODE,
                    msg : "错误",
                    err: err
                });
            }else{
                return format.formatReturn({
                    code : baseConst.SUCCESS_CODE,
                    msg : "成功。",
                    data: obj
                });
            }
        });
    } catch (error) {
        return format.formatReturn({
            code : baseConst.ERROR_CODE,
            msg : "连接solr失败！请检查连接配置，并确保solr服务运行正常。",
            err: error
        });
    }
}

//条件更新
//query = 'id:"ee0f1790de1b4245b81d99b258a34e92"';
//!是否所有满足条件的数据，全部更新。需要测试
//!是原子更新 还是非原子更新需要测试
exports.module.deleteByQuery =(optin , query) => {
    try {
        var client = solr.createClient(optin);
        client.update(query,function(err,obj){
            if(err){
                return format.formatReturn({
                    code : baseConst.ERROR_CODE,
                    msg : "错误",
                    err: err
                });
            }else{
                return format.formatReturn({
                    code : baseConst.SUCCESS_CODE,
                    msg : "成功。",
                    data: obj
                });
            }
        });
    } catch (error) {
        return format.formatReturn({
            code : baseConst.ERROR_CODE,
            msg : "连接solr失败！请检查连接配置，并确保solr服务运行正常。",
            err: error
        });
    }
}