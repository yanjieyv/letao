$(function () {
    // 不使用一下接口，会连isBelete的数据也接收到
    // $.ajax({
    //     type: "get",
    //     url: "/cart/queryCartPaging",
    //     data: {
    //         page: 1,
    //         pageSize: 10
    //     },
    //     success: function (res) {
    //         console.log(res);
    //         if (res.error == 400) {
    //             mui.toast(res.message);
    //             location.href = "/m/login.html?returnURL=" + location.href;
    //         } else {
    //             var html = template("cart", res);
    //             $(".mui-scroll ul").html(html);
    //             mui('.mui-scroll-wrapper').scroll({
    //                 deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    //             });
    //         }

    //         // list = document.querySelectorAll(".list");
    //         // console.log(list);
    //     }
    // })
    function getCartData() {
        $.ajax({
            type: "get",
            url: "/cart/queryCart",
            data: {},
            success: function (res) {
                // console.log({data:res});
                if (res.error == 400) {
                    mui.toast(res.message);
                    location.href = "/m/login.html?returnURL=" + location.href;
                } else {
                    var html = template("cart", { data: res });
                    $(".mui-scroll ul").html(html);
                    mui('.mui-scroll-wrapper').scroll({
                        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                    });
                }

                // list = document.querySelectorAll(".list");
                // console.log(list);
            }
        })
    }
    getCartData();
    $(document).on("tap", ".psize", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    })
    $(document).on("tap", ".mui-btn-blue", function () {
        var _this = $(this);
        var id = $(this).data("id");
        var indes = $(this).data("indes");
        var items = {
            productSize: _this.data("productsize"),
            productNum: _this.data("productnum"),
            num: _this.data("num"),
            size: _this.data("size")
        }
        var html = template("edit", items);
        // console.log(items);
        html = html.replace(/\n/g, "");
        mui.confirm(html, '编辑商品', ["确定", "取消"], function (e) {
            if (e.index == 0) {
                var edit_size = $(".psize.active").text();
                var edit_num = $(".mui-numbox>.mui-input-numbox").val();
                // console.log(edit_num,edit_size);
                // console.log(_this.parent().siblings("a"));
                // li内容盒子
                var li = _this.parent().parent()[0];
                // console.log(li);
                $.ajax({
                    type: "post",
                    url: "/cart/updateCart",
                    data: {
                        id: id,
                        size: edit_size,
                        num: edit_num
                    },
                    success: function (res) {
                        // console.log(res);
                        if (res.success) {
                            // js实时修改数值
                            $(li).find(".size").find("em").text(edit_size);
                            $(li).find(".number").find("em").text(edit_num);
                            _this[0].dataset.size = edit_size;
                            _this[0].dataset.num = edit_num;
                            mui.swipeoutClose(li);
                            getTol();
                            mui.toast("修改成功");
                        } else {
                            mui.toast(res.message);
                        }
                    }
                });
            }
        })
        mui(".mui-numbox").numbox();
        // $.ajax({
        //     type: "get",
        //     url: "/cart/queryCartPaging",
        //     data: {
        //         page: 1,
        //         pageSize: 10
        //     },
        //     success: function (res) {
        //         // console.log(res);
        //         items = res.data[indes];
        //         var html = template("edit", items);
        //         // console.log(items);
        //         html = html.replace(/\n/g, "");
        //         mui.confirm(html, '编辑商品', ["确定", "取消"], function (e) {
        //             if (e.index == 0) {
        //                 var edit_size = $(".psize.active").text();
        //                 var edit_num = $(".mui-numbox>.mui-input-numbox").val();
        //                 // console.log(edit_num,edit_size);
        //                 // console.log(_this.parent().siblings("a"));
        //                 // li内容盒子
        //                 var li = _this.parent().parent()[0];
        //                 // console.log(li);
        //                 $.ajax({
        //                     type: "post",
        //                     url: "/cart/updateCart",
        //                     data: {
        //                         id: id,
        //                         size: edit_size,
        //                         num: edit_num
        //                     },
        //                     success: function (res) {
        //                         // console.log(res);
        //                         if (res.success) {
        //                             // js实时修改数值
        //                             $(li).find(".size").find("em").text(edit_size);
        //                             $(li).find(".number").find("em").text(edit_num);
        //                             _this[0].dataset.size = edit_size;
        //                             _this[0].dataset.num = edit_num;
        //                             mui.swipeoutClose(li);
        //                             getTol();
        //                             mui.toast("修改成功");
        //                         } else {
        //                             mui.toast(res.message);
        //                         }
        //                     }
        //                 });
        //             }
        //         })
        //         mui(".mui-numbox").numbox();
        //     }
        // })

        // var num = $(this).data("num");
        // var productSize = $(this).data("productsize");
        // var size = $(this).data("size");
        // var productNum = $(this).data("productnum");
        // var items = {
        //     id:id,
        //     num:num,
        //     productsize:productsize,
        //     size:size,
        //     productNum:productNum
        // }
        // console.log(items);

    })
    $(document).on("tap", ".mui-btn-red", function () {
        // var id = $(this).data("id");
        // console.log(id);
        // /cart/deleteCart
        var ids = [];
        // console.log($(".checks:checked"));
        var chks = $(".checks:checked");
        for (var i = 0; i < chks.length; i++) {
            ids.push(chks[i].dataset.id);
        }
        // console.log(ids);
        if (ids.length == 0) {
            ids.push($(this).data("id"));
        }
        // console.log(ids);
        mui.confirm("是否删除商品", '删除', ["确定", "取消"], function (e) {
            if (e.index == 0) {
                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: { id: ids },
                    success: function (res) {
                        // console.log(res);
                        if(res.success){
                            getCartData();
                        }else{
                            mui.toast(res.message);
                        }
                    }
                })
            }
        })
    })
    $(document).on("change", ".checks", function () {
        getTol();
    })
    function getTol() {
        var checks = $(".checks:checked");
        var tol = 0;
        for (var i = 0; i < checks.length; i++) {
            tol = tol + (checks[i].dataset.price * $(checks[i]).parent().find(".number>em").text());
        }
        tol = Math.ceil(tol * 100) / 100;
        tol = tol * 1 == 0 ? '00.00' : tol;
        $(".tol").text(tol);
    }
})