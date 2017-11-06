$(function(){
    $("#searchBtn").on("tap",function(){
        var value = $(".searchText").val();
        location.href = "searchList.html?key="+value;
    })
})