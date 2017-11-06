$(function () {
    // mui(".mui-numbox").numbox();
    // mui('.mui-scroll-wrapper').scroll({
    //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // });
    // mui('.mui-slider').slider({
    //     interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
    // });
    $(document).on("tap", ".psize", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    })
    var id = lt.getParameter(location.search)['id'];
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: { "id": id },
        success: function (res) {
            // console.log(res);
            var html = template("product", res);
            $(".mui-scroll").html(html);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            mui(".mui-numbox").numbox();
            mui('.mui-slider').slider({
                interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    });
    $(".mui-btn-warning").on("tap", function () {
        // console.log(this);
        var num = $(".mui-input-numbox").val();
        var size = $(".psize.active").text();
        $.ajax({
            type: 'POST',
            url: '/cart/addCart',
            data: {
                "productId": id,
                "num": num,
                "size": size
            },
            success: function (res) {
                // console.log(res);
                // mui.toast("尚未登录");
                if (res.error && res.error == 400){
                    mui.confirm('抱歉尚未登录，无法添加购物车', '是否登录', ["是", "否"], function (e) {
                        if (e.index == 0) {
                            location.href = "login.html?returnURL="+location.href;
                        }
                    })
                } else {
                    mui.confirm('添加购物车成功，是否进入购物车查看', '操作提示', ["是", "否"], function (e) {
                        if (e.index == 0) {
                            location.href ="user/cart.html";
                        }
                    })
                }
            }
        });
    })
})