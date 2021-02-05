var child = require('child_process');
const exec = require('child_process').execSync;
var bodyParser = require('body-parser');//接受传参的库
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const iconv = require('iconv-lite');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio'); //可以解析HTML文件，使用API操作文档内容
const open = require('open');

module.exports = function (app) {
    app.get('/bookMark', function (req, res) {
        res.render('bookMark/bookMark');
    });
    app.get('/setBookMarkConfig', function (req, res) {
        res.render('bookMark/setBookMarkConfig');
    });
    //!获取书签数据
    app.post('/getBookmarksByChrome', urlencodedParser, async (req, res) => {
        var bookmarkPathByChrome = global.config.bookMarkSetting.chromePath;
        fs.readFile(bookmarkPathByChrome, async (err, data) => {
            if (err) { 
                res.json({ code: 0});
                return console.error(err); 
            }else{
                parseChromeBookmark(data,res);
                return;
            }
        });
        
    });
    function parseChromeBookmark(data,res){
        var obj = JSON.parse(data.toString());
        var bookmark_bar = obj.roots.bookmark_bar;//书签栏
        var other = obj.roots.other; //其他书签
        var synced = obj.roots.synced; //移动设备书签

        //递归解析所有网页及文件夹
        var bookmark_bar_list = recursion(bookmark_bar);
        var other_list = recursion(other);
        var synced_list = recursion(synced);
        res.json({ code: 1,data:bookmark_bar_list.concat(other_list).concat(synced_list)});
    }
    //递归解析所有网页及文件夹
    function recursion(obj){
        var list = [];
        //添加当前节点
        if( obj.type ){
            list.push({
                id : obj.id,
                name :obj.name,
                type:obj.type,
                url:obj.url || "",
                guid : obj.guid,
                date_modified : obj.date_modified || "",
                date_added:obj.date_added
            });
        }
        //添加当前节点的children节点
        if(obj.children){
            for( var i=0;i<obj.children.length;i++){
                //合并数组
                recursion(obj.children[i]).forEach(function(val){
                    if( !val.parentId){
                        val.parentId = obj.id;
                        val.parentName = obj.name;
                    }
                    list.push(val);
                });
            }
        }
        return list;
    }
    //!解析chrome书签文件
    app.post('/saveBookmarkPathByChrome', urlencodedParser, async (req, res) => {
        var bookmarkPathByChrome = req.body.bookmarkPathByChrome;
        res.json({ code: 1});
        //C:\Users\LENOVO\AppData\Local\Google\Chrome\User Data\Default\Bookmarks

        // fs.readFile(bookmarkPathByChrome, async (err, data) => {
        //     if (err) { 
        //         res.json({ code: 0});
        //         return console.error(err); 
        //     }else{
        //         parseChromeBookmark(data,res);
        //         return;
        //     }
        // });
        
    });
    app.post('/updateBookMarkConfig',urlencodedParser, async (req, res) =>{
        if( typeof(global.config.bookMarkSetting) != "Object" || global.config.bookMarkSetting == "" ){
            global.config.bookMarkSetting = {};
        }
        global.config.bookMarkSetting.chromePath = req.body.chromePath;
        fs.writeFile(path.join( process.cwd(), "./config.json"), JSON.stringify(global.config), function (error) {
            if (!error) {
                res.json({ code: 1});
            }
        })
    });
    app.post('/getBookMarkConfig',urlencodedParser, async (req, res) =>{
        res.json({ code: 1,data:global.config.bookMarkSetting});
    });
    
}