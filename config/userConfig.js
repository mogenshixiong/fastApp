module.exports = function (app) {
    //亮色主题
    var lightSkin = {
        "wallpaper":"file/wallpaper/110.jpg", //背景图片
        "opacity" : "0.9 !important", //模块透明度
        "module_background_color" : "",//模块的背景色
        "module_color" : "",//模块的字体颜色

        "header_background_color" : "white !important",//导航条头部背景色
        "header_color" : "black !important", //导航条头部 字体颜色
        "header_search_background_color" : "#373636  !important", //导航条-检索框-背景颜色
        "header_right_icons_color" : "black !important",//导航条 右侧小图标颜色设置
        "header_right_icons_color_hover" : "white !important",//导航条 右侧小图标 移入时颜色设置
        "v":"0.1"
    };

    //暗色主题
    var darkShin = {
        "wallpaper":"file/wallpaper/196.jpg", //背景图片
        "module_background_color" : "#2a3b4c !important",//模块的背景色
        "module_color" : "white !important",//模块的字体颜色
    };

    //默认主题
    var defaultShin = {
        "wallpaper":"file/wallpaper/196.jpg", //背景图片
        "opacity" : "0.95 !important", //模块透明度        
    };

    //自定义主题
    var customSkin = {

    }

    app.locals["userConfig"] = defaultShin;
}