$(function () {
    // '/user/queryUserMessage'
    // '/user/logout'
    /*1.显示用户信息*/
    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        data: {},
        dataType: "json",
        success: function (res) {
            // console.log(res);
            if(res.error && res.error == 400 && !res.username){
                mui.confirm(res.message, '是否登录', ["是", "否"], function (e) {
                    if (e.index == 0) {
                        location.href = "login.html?returnURL="+location.href;
                    }else{
                        location.href = "/m/index.html";
                    }
                })
            }else{
                $(".uName").text(res.username);
                $(".uMobi").text("绑定手机：" + res.mobile);
            }   
        }
    })
    /*2.退出操作*/
    $(".p10>a").on("tap", function () {
        mui.confirm('退出将无法使用购物车和购买商品', '是否退出', ["是", "否"], function (e) {
            if (e.index == 0) {
                $.ajax({
                    type:"get",
                    url:"/user/logout",
                    data:{},
                    success:function(res){
                        // console.log(res);
                        if(res.success){
                            mui.toast("退出成功");
                            location.href = "login.html?returnURL="+location.href;
                        }else{
                            mui.toast(res.message);
                        }
                    }
                })
            }
        })
    })
    /*获取用户信息*/
})