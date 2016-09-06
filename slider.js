/**
 * Created by Administrator on 2016/9/4 0004.
 */
window.onload = function () {
    function $(id) {
        return document.getElementById(id);
    }
    var slider = $("w_slider");
    var slider_main_block = $("slider_main_block");
    var slider_ctrl = $("slider_ctrl");
    var imgs = slider_main_block.children;

    for(var i =0; i<imgs.length; i++){
        var span  = document.createElement("span");
        span.className = "slider-ctrl-con";
        span.innerHTML = imgs.length - i;
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    }

    var spans = slider_ctrl.children;
    spans[1].setAttribute("class","slider-ctrl-con current");

    var scrollWidth = slider.clientWidth;
    for(var i =1; i<imgs.length; i++){
        imgs[i].style.left = scrollWidth + "px";
    }

    // 遍历span按钮
    var key =0;
    for(var k in spans){
        spans[k].onclick = function () {
            if(this.className == "slider-ctrl-prev"){
                animate(imgs[key],{left:scrollWidth});
                --key<0?key = imgs.length-1:key;
                imgs[key].style.left = -scrollWidth + "px";
                animate(imgs[key],{left:0});
                getSquare();
            }else if(this.className == "slider-ctrl-next"){
                autoPlay();
                getSquare();
            }else{


                var that = this.innerHTML - 1;// 传递当前索引号
                if(that > key){
                    // 向右走
                    animate(imgs[key],{left:-scrollWidth});
                    imgs[that].style.left = scrollWidth + "px";
                }else if(that < key){
                    // 向左走
                    animate(imgs[key],{left:scrollWidth});
                    imgs[that].style.left = -scrollWidth +"px";
                }
                key = that;
                animate(imgs[key],{left:0});
                getSquare();
            }
        }
    }

    // 小方块变色
    function getSquare() {
        for(var i = 1; i<spans.length-1; i++){
            spans[i].className = "slider-ctrl-con";
        }
        spans[key+1].className = "slider-ctrl-con current";
    }

    // 定时器
    var timer = null;
    timer = setInterval(autoPlay,3000);
    function autoPlay() {
        animate(imgs[key],{left:-scrollWidth});
        ++key>imgs.length-1? key = 0: key;
        imgs[key].style.left = scrollWidth +"px";
        animate(imgs[key],{left:0});
    }

    slider.onmouseover = function () {
        clearInterval(timer);
    }
    slider.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(autoPlay,3000);
    }
}