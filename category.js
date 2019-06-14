window.onload = function () {
    new IScroll(document.querySelector(".jd_cateLeft"),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector(".jd_cateRight"),{
        scrollX:false,
        scrollY:true
    });
    /*子容器大于父容器才能实现这种效果*/
};