
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var lt = {};
lt.getParameter = function (str) {
    var pa = {};
    str = str.substring(1);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split("=");
        pa[item[0]] = item[1];
    }
    return pa;
}
// console.dir(lt);
