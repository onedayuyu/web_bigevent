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

    //2.对需要权限的接口配置头信息
    //必须以my开头才行
    if (opstions.url.indexOf('/my/') !== -1) {
        opstions.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    //3.登录拦截所有响应,判断身份认证信息
    opstions.complete = function(res) {
        console.log(res);
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            //清空本地数据
            localStorage.removeItem("token")
                //跳转登录页面
            location.href = "/login.html"
        }
    }
})