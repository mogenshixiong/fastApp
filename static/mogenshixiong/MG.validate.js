MG.validate = {
  isJSON, //是否为JSON字符串
  isPositiveInteger, //是否为正整数（只能为0-9）
  isPositiveNumber, //是否为正数
};
function isJSON(str){
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) { 
        return true; 
      } else { 
        return false; 
      }
    } catch (e) { 
      return false; 
    }
  } else { 
    return false; 
  }
}
function isPositiveInteger(str){ //是否为正整数（只能为0-9）
  var list = str.split("");
  for(var i=0;i<list.length;i++){
    if(list[i] == "1"||list[i] == "2"||list[i] == "3"||list[i] == "4"||list[i] == "5"
      ||list[i] == "6"||list[i] == "7"||list[i] == "8"||list[i] == "9"||list[i] == "0"){
    }else{
      return false;
    }
  }
  return true;
}
function isPositiveNumber(){ //是否为正数
  //首位和末尾不能是.
  if(input.substring(0,1) == "." || input.substring(input.length-1,input.length) == "."){
    return false;
  }
  //不能出现2个.
  if(input.split(".").length>2){
    return false;
  }
  var list = input.split("");
  //只能输入0-9和.
  for(var i=0;i<list.length;i++){
    if(list[i] == "1"||list[i] == "2"||list[i] == "3"||list[i] == "4"||list[i] == "5"
      ||list[i] == "6"||list[i] == "7"||list[i] == "8"||list[i] == "9"||list[i] == "0"||list[i] == "."){
    }else{
      return false;
    }
  }
  return true;
}