$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度必须1到6位，且不能出现空格!"
            }
        }
    })

    //获取用户信息
    getinitUserInfo()


    function getinitUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                //把用户信息渲染到页面中
                form.val("formUserInfo", res.data)
            }
        })
    }

    //表单重置
    $('#btnReset').on("click", function(e) {
        //阻止input的reset默认的重置事件
        e.preventDefault()
            //为form重新
        getinitUserInfo()
    })

    //监听表单提交事件
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改信息失败")
                }
                layer.msg("修改信息成功")
                    //调用父页面中的更新用于信息和头像
                window.parent.getUserInfo()
                console.log(window);
            }
        })
    })
})