$(function () {
    window.onload = function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:{
                'page':1,
                'pageSize':10
            },
            success:function(result){
                // console.log(result);
                var html = template('product',result);
                // console.log(html);
                $('.lt_product').html(html);
            }
        });
        $(".lt-top-rbtn").on("tap",function(){
            // console.log(123);
        })
    }

})