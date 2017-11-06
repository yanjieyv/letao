(function(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        data:{},
        success:function(result){
            // console.log(result);
            var html = template("firstCat",result);
            $(".ca_left .mui-scroll>div").html(html);
            var dataId = result.rows[0].id;
            getSecondCat(dataId,function(result){
                // console.log(result);
                var html = template("secondCat",result);
                $(".ca_right .mui-clearfix").html(html);
            });
        }
    });
    $(".ca_left").on("tap",".firstCat",function(){
        // console.log(123);
        var element = $(this);
        var id = element.data('id');
        getSecondCat(id,function(result){
            var html = template("secondCat",result);
            $(".ca_right .mui-clearfix").html(html);
            element.siblings().removeClass("active");
            element.addClass("active");
        })
    })
    function getSecondCat(id,callback){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{'id':id},
            success:function(result){
                callback && callback(result);
            }
        });
    }
})();
