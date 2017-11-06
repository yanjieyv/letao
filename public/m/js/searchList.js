$(function () {
    $(".lt_product").on("tap","button.mui-btn-primary",function(){
        location.href = "product-detail.html?id="+$(this).data("id");
        // console.log(this);
    })
    /*
     初始化渲染
     1.获取地址栏关键字
     2.通过关键字去后台获取和关键字相关的商品数据
     3.渲染商品列表

     当前页搜索
     1.点击搜索按钮 获取到关键字
     2.通过关键字去后台获取和关键字相关的商品数据
     3.渲染商品列表

     排序展示
     1.点击排序按钮 获取排序方式
     2.通过当前的关键字和排序方式去后台获取相关的商品数据
     3.渲染商品列表

     下拉刷新
     1.当用户下拉页面
     2.通过关键字去后台重新获取和关键字相关的商品数据
     3.渲染商品列表

     上拉加载
     1.当用户上拉页面
     2.通过关键字去后台获取和关键字相关的商品数据（而且是根据当前页面进行获取）
     3.渲染商品列表 当时是追加到页面当中
     * */
    // 初始化渲染
    // 1.获取地址栏关键字
    var pa = lt.getParameter(location.search);
    // 2.通过关键字去后台获取和关键字相关的商品数据
    var loadData = function (pa1) {
        var data = {
            "proName": pa["key"],
            "page": 1,
            "pageSize": 100
        }
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: $.extend(data, pa1),
            success: function (result) {
                // console.log(pa["key"],result);
                var html = template("product", result);
                $(".lt_product").html(html);
                // console.log($.extend(data, pa1));
                if(!result.data.length){
                    $(".lt_product").html("<p class='emp'>暂无数据</p>");
                }
            }
        });
    }
    // 3.渲染商品列表
    loadData();

    // 排序展示
    // 1.点击排序按钮 获取排序方式
    // 2.通过当前的关键字和排序方式去后台获取相关的商品数据
    // 3.渲染商品列表
    $("[data-type]").on("tap", function () {
        // if($("[data-type].active").find("span").hasClass("fa-angle-up")){
        //     $("[data-type].active").find("span")[0].className = "fa fa-angle-down";
        // }
        if ($(this).hasClass("active")) {
            if ($(this).find("span").hasClass("fa-angle-up")) {
                // console.log(123);
                $(this).find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
            } else {
                // console.log(1234);
                $(this).find("span").removeClass("fa-angle-down").addClass("fa-angle-up");
            }
        } else {
            $("[data-type].active").find("span")[0].className = "fa fa-angle-down";
            // $(this).siblings().find("span")[0].className = "fa fa-angle-down";
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        }
        var type = $(this).data("type");
        var orderTypa = $(this).find("span").hasClass("fa-angle-up") ? 1 : 2;
        var pa = {};
        pa[type] = orderTypa;
        loadData(pa);
    });
    

    // 当前页搜索
    // 1.点击搜索按钮 获取到关键字
    // 2.通过关键字去后台获取和关键字相关的商品数据
    // 3.渲染商品列表
    $(".search a").on("tap",function(){
        pa["key"] = $(".search input").val();
        if(pa["key"] == ""){
            $(".search input").val("请输入关键词");
            return;
        } 
        loadData({"proName": pa["key"]});
    })
})