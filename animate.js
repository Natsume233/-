/**
 * Created by Administrator on 2016/9/4 0004.
 */
function animate(obj,json,fun) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;    //   重点：把flag放到timer里
        for(var attr in json){
            var current = parseInt(getStyle(obj,attr));
            var step = (json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            // 判断透明度
            if(attr == "opacity"){
                if("opacity" in obj.style){
                    obj.style.opacity = json[attr];
                }else{
                    obj.style.filter = "alpha(opacity ="+ json[attr]*100 +")";
                }
            }else if(attr == "zIndex"){
                obj.style[attr] = json[attr];
            }else{
                obj.style[attr] = current + step + "px";
            }

            if(current != json[attr]){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fun){
                fun();
            }
        }
    },7);
}


function getStyle(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}