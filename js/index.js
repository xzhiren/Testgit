window.onload = function () {
    search();
    banner();
    downTime();
};

var search = function () {
    /*1.默认固定顶部透明背景*/
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    var opacity = 0;
    /*监听页面滚动事件*/
    window.onscroll = function () {
        /*console.log(document.body.scrollTop);
         console.log(document.documentElement.scrollTop);
         console.log(window.pageYOffset);*/
        var scrollTop = document.documentElement.scrollTop;
        //console.log(scrollTop);
        /*默认的透明度*/
        if (scrollTop < height) {
            /*2.当页面滚动的时候---随着页面卷曲的高度变大透明度变大*/
            opacity = (scrollTop / height) * 0.85;
        } else {
            /*3.当页面滚动的时候---超过某一个高度的时候透明度不变*/
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }
};
var banner = function () {
    /*
     * 1.自动轮播且无缝
     * 2.点随着轮播滚动
     * 3.轮播
     * 4.当手滑动超过图片1/3宽度自动向左或向右滚动
     * 5.当手滑动不超过图片1/3宽度，放开时自动恢复到原位置
     * */
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imagesBox = banner.querySelector("ul:first-child");
    var pointsBox = banner.querySelector("ul:last-child");
    var points = pointsBox.querySelectorAll("li");
    var index = 1;
    /*索引值，通过这个值来判断向左滚动几张图片*/
    var addTransition = function () {

        imagesBox.style.transition = "all 0.3s";
        imagesBox.style.webkitTransition = "all 0.3s";
    };
    var removeTransition = function () {
        imagesBox.style.transition = "none";
        imagesBox.style.webkitTransition = "none";
    };
    var setTranslateX = function (translateX) {
        imagesBox.style.transform = "translateX(" + (translateX) + "px)";
        imagesBox.style.webkitTransform = "translateX(" + (translateX) + "px)";
    };
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);

    }, 3000);
    /*
     * 需要等最后一张动画结束时去做判断*/
    imagesBox.addEventListener("transitionend", function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslateX(-index * width);
        }
        /*滑动的时候也需要无缝*/
        else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        setPoint();

    });
    var setPoint = function () {
        for (var i = 0; i < points.length; i++) {
            /*banner图片index 范围在 1-8 ，而i在0-7 */
            points[i].classList.remove("now");
        }
        points[index - 1].classList.add("now");
    };
    /*绑定事件
     * */
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    /*判定是否滑动的全局变量*/

    imagesBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        /*获取手指开始所在的X轴位置*/
        startX = e.touches[0].clientX;
    });
    imagesBox.addEventListener('touchmove', function (e) {
        /*获取移动后的手指X轴位置*/
        var moveX = e.touches[0].clientX;
        /*手指移动的距离（不区分正负）*/
        distanceX = moveX - startX;
        /*banner移动的距离 = 当前定位+手指移动的距离*/
        var translateX = -index * width + distanceX;
        /*瞬间到一个位置分两步：清除过渡 做位移*/
        removeTransition();
        setTranslateX(translateX);
        /*移动了*/
        isMove = true;
    });
    imagesBox.addEventListener('touchend', function () {
        /*只有移动了才进入这一步*/
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTranslateX(-index * width);
            }
            else {
                if (distanceX > 0) {
                    index--;
                } else if (distanceX < 0) {
                    index++;

                }
                addTransition();
                setTranslateX(-index * width);

            }
        }
        /*参数重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 3000);

    });

};
var downTime = function () {
    var time = 2 * 60 * 60;
    var spans = document.querySelectorAll(".time span");
    var timer = setInterval(function () {
        time--;
        var h =Math.floor(time / 3600) ;
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;

        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000);
};