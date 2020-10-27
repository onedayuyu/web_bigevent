//1,开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
    //2,测试环境服务器地址
    // var baseURL = "http://ajax.frontend.itheima.net"
    //3,生产环境服务器地址
    // var baseURl = "http://ajax.frontend.itheima.net"




//$.ajaxPrefilter()要绑定在说有 ajax 之前
//这个方法会在 ajax 请求执行后再触发!
//只有这个方法执行完毕,ajax才会真正发送
$.ajaxPrefilter(function(opstions) {
    //拼接对应环境的服务器地址
    opstions.url = baseURL + opstions.url
})