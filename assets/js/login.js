//人口函数
$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //2.登录表单区自定义校验规则
    var form = layui.form
    var layer = layui.layer

    form.verify({
            //密码规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //确认密码规则
            repwd: function(value) {
                //选择器必须带空格,选择的是后代中的input,name属性值
                //为password的那个标签
                var pwd = $(".reg-box input[name = password]").val()
                    //比较
                if (value !== pwd) {
                    return "两次密码输入不一致"
                }
            }


        })
        //监听注册表单事件,提交注册表单
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '  /api/reguser',
            data: { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('已注册成功 ! 请登录')
                $('#link_login').click()
                $('#form-reg')[0].reset()
            }
        })
    })

    //登录页面提交数据
    $("#form-login").on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                //检查返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提示信息,保存token,跳转页面
                layer.msg('登陆成功')
                    //保存token,未来的接口要使用token.
                localStorage.setItem("token", res.token)
                    //跳转
                location.href = "/index.html";
            }
        })
    })
})