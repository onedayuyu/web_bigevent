//入口函数
$(function() {
    //获取用户信息
    getUserInfo()

    // 点击退出事件  退出登录页面
    $("#btnlogout").on("click", function() {
        layer.confirm('确定需要退出吗?', { icon: 3, title: '提示' }, function(index) {

            // 清空本地的token
            localStorage.removeItem("token")
                // 跳转到登录页面
            location.href = "/login.html"
                // 关闭提示框
            layer.close(index);
        });
    })
})


// 获取用户信息(封装到入口函数的外面了)
//原因:后面其他的页面要调用
// var layui = layui.form
// var layer = layui.layer

function getUserInfo() {
    //发送ajax请求
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     //重新登录,因为token过期时间为12小时
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            randerAvatar(res.data)
        }
    })


}

function randerAvatar(user) {

    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)

    if (user.user_pic) {
        //有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        //没有头像
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()


    }

}