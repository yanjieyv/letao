$(function(){
    $(".mui-icon-eye").on("tap",function(){
        if($(".mui-input-password").attr("type")=="text"){
            $(".mui-input-password").attr("type","password");
        }else{
            $(".mui-input-password").attr("type","text");
        }
    })
    $(".mui-btn-primary").on("tap",function(){
        if($.trim($(".mui-input-clear").val()) == ""){
            mui.toast("请输入用户名");
            return false;
        }
        if($.trim($(".mui-input-password").val()) == ""){
            mui.toast("请输入密码");
            return false;
        }
        var data = {
            "username":$(".mui-input-clear").val(),
            "password":$(".mui-input-password").val()
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:data,
            success:function(res){
                // console.log(res);
                if(res.success){
                    if(location.search && location.search.indexOf("returnURL")){
                        // var pa = lt.getParameter(location.search);
                        // console.log(location.search.replace("?returnURL=",""));
                        location.href = location.search.replace("?returnURL=","");
                    }else{
                        location.href = "index.html";
                    }
                }else{
                    mui.toast(res.message);
                }
            }
        })
    })
})