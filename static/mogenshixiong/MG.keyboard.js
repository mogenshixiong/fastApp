//封装回车事件
MG.key = {
  enterByIds: null,
  enterFunction: null,
  enter:function(ids, fun) {
    if(typeof fun === "function") {
      MG.key.enterByIds = ids;
      MG.key.enterFunction = fun;
    }
  }
}

//页面初始化时，注册：回车调用事件
//MG.key.enter('loginName,password',login);
document.onkeydown = function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if(e && e.keyCode==13){ // enter 键
    var activeElementId = document.activeElement.id;
    if(!MG.key.enterByIds){
      return;
    }
    var idList = MG.key.enterByIds.split(",");
    for(var i=0;i< idList.length; i++){
      if(activeElementId ==idList[i]){
        if(typeof MG.key.enterFunction === "function") {
          MG.key.enterFunction();
          break;
        }
      }
    }
  }
}