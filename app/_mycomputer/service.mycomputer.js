const uuid = require('node-uuid');
const fs = require('fs');

function getFolderNode(path) {
  //获取一级目录
  let res = {
    id: 'root',
    topic: path==''?'root':path,
    children: [],
  };
  if( path == '' ){
    res.children = getRootNodeFolders(); // 获取我的电脑驱动器盘符
  }else{
    res.children = getPathNodeFolders(path); //获取指定路径下的所有文件夹
  }

  //循环获取二级目录
  for(var i=0;i<res.children.length; i++){
    res.children[i].children = getPathNodeFolders(res.children[i].path);
    res.children[i].expanded = closeNode(res.children[i].children);

    //循环获取三级目录， 没有太好的展示方式。
    for(var j=0;j<res.children[i].children.length; j++){
      res.children[i].children[j].children = getPathNodeFolders(res.children[i].children[j].path);
      res.children[i].children[j].expanded = closeNode(res.children[i].children[j].children);
    }
  }
  return res;
}

module.exports.getFolderNode = getFolderNode;
function closeNode(list){
  if( list.length >10 ){//节点数量大于10就默认关闭节点
    return false;
  }
  return true;
}

function getPathNodeFolders(path){
  try {
    let res = [];
    const files = fs.readdirSync( path );
    for(var i=0;i< files.length; i++){
      if( files[i].indexOf('.') != '-1'){
        continue;
      }
      let place = i%2==0?'left':'right';
      let obj = {
        // id: uuid.v1(),
        id: path+'\\'+ files[i],
        topic: files[i],
        direction: place,
        expanded: true,
        path: path+'\\'+ files[i],
        children: [],
      };
      res.push(obj);
    }
    return res;
  } catch (error) {
    //非文件夹类型
    return [];
  }
  
}
function getRootNodeFolders(){
  let res = [];
  for(var i =0;i < global.drives.length; i++){
    let place = i%2==0?'left':'right';
    let obj = {
      // id: uuid.v1(),
      id: global.drives[i],
      topic: global.drives[i],
      direction: place,
      expanded: true,
      path: global.drives[i] ,
    };
    res.push(obj);
  }
  return res;
}