// Load dependency
var solr = require('solr-client');

// 连接配置
var optin = {
    "host": "127.0.0.1",
    "port": "8983",
    "core": "keywords",
    "path": "/solr",
}
var client = solr.createClient(optin);

// 新增时，需要注意必填项。如果没有会报错导致新增失败。
// 必填项在xml里配置
// add();
function add(a) {
    delete_obj_keys(a, ["_version_"]);
    //var a = {"id":"ee0f1790de1b4245b81d99b258a34e92","intIS_jie_ci_pai_xu":1,"type":"yi_a\"12333'33n_jian_yi","copyTitle":"1234"}
    a.create_user_name = "lisai";
    console.log(delete_obj_keys(a, ["_version_:"]));
    client.add(delete_obj_keys(a, ["_version_:"]), function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log('Solr response:', obj);
        }
    });
}

//查询条件
// search();
function search() {
    var query = 'id:"98f9987f40e945738507215ac625b8a1"';
    client.search({ q: query }, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log('Solr response:', obj);
            for (let i in obj.response.docs) {
                // console.log(obj.response.docs[i]);
                add(obj.response.docs[i]);
            }
        }
    });
}

//删除
//  client.deleteByQuery(query,function(err,obj){
//     if(err){
//        //console.log(err);
//     }else{
//        console.log('Solr response:', obj);
//     }
//  });

//更新
//  client.update(query,function(err,obj){
//     if(err){
//        //console.log(err);
//     }else{
//        console.log('Solr response:', obj);
//     }
//  });

test(3000000);
function test(rows) {
    console.time(rows + '条数据查询耗时');
    try {
        client.search({
            q: "*:*",
            start: 0,
            rows: rows,
            fl:"id"
        }, function (err, obj) {
            if (!err) {
                // console.log(obj.response.docs.length);
                console.log("查询数据结果：" + obj.response.docs.length + "条");
                console.timeEnd(rows + '条数据查询耗时');
                console.log(obj.response.docs[0]);
                //console.time(rows + '条数据更新耗时')

                //updateOne(obj.response.docs, rows);
            } else {
                console.log("0");
            }
        });
    } catch (e) {
        throw e;
    }
}

function updateOne(list, rows) {
    if (list.length > 0) {
        client.add( format(list[0]), function (adderr, updateobj) {
            if (adderr) {
                throw adderr;
            } else {
                //100的倍数时打印执行进度
                //if( /^[1-9][0-9]*0{2}$/.test(list.length) ){
                //     console.log(list.length);
                // }
                //console.log("solr update success:"+format(list[0]).id);
            }
            updateOne(list.splice(1, list.length), rows);
        });

    } else {
        console.log("执行完毕");
        console.timeEnd(rows + '条数据更新耗时');
    }
}


function format(obj) {
    var returnObj = {};
    for (var i in obj) {
        if (i != "_version_") {
            returnObj[i] = obj[i];
            //字段类型不符合回报错
            if (i == "copyTitle") {
                returnObj[i] = obj[i].toString()
            }
        }
    }
    returnObj.stringIS_mogenshixiong = "222222222222222222";
    // console.log(returnObj);
    return returnObj;
}
function delete_obj_keys(obj, keys) {
    for (var index in keys) {
        obj[keys[index]] = undefined;//设置undefined实现删除属性
    }
    return obj;
}
// node --max-old-space-size=8192 solrtest.js