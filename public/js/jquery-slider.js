
(function ($) {
    $.fn.extend({
        slider: function (options) {
            let main = null;   //主函数
            let init = null;   //初始化函数
            let start = null;   //开始动画
            let stop = null;   //停止动画
            let timer = null;   //定时器
            let elms = {};     //命名空间
            let defaults = {
                speed: 800,
                delay: 3000
            };                  //默认参数 切换速度以及停留速度
            $.extend(defaults, options); // 合并参数
            //先进行初始化
            init = function () {
                //console.log(1);
                elms.sliderDiv = this.children('.pic');
                //console.log(elms.sliderDiv, 1);
                elms.sliderDiv.append(elms.sliderDiv.children('img').first().clone());
                elms.imgWidth = elms.sliderDiv.children('img').first().width();
                elms.index = 1;    //预设图片的索引值
                this.hover(function () {
                    stop();
                    // console.log('停止动画');
                }, function () {
                    // console.log('开始');
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                });
            }.bind(this)
            //开始动画
            start = function (flag) {
                //定义移动的距离
                let left = `-=${elms.imgWidth}`;
                elms.sliderDiv.animate({
                    left: left
                }, defaults.speed, function () {
                    if (flag) {
                        elms.index++;
                        // point();
                        //console.log(elms.index);
                    } else {
                        //console.log(1);
                        elms.index--;
                        //point();
                    }
                    if (elms.index === 4) {
                        elms.index = 1;
                        //point();
                        // console.log(1);
                        elms.sliderDiv.css('left', 0);
                    }
                });
            }.bind(this);
            stop = function () {
                clearInterval(timer);
                elms.sliderDiv.stop(true, true); //完成当前动画 清空动画队列
            }
            main = function () {
                init();
                timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
            }
            main();
        }
    })
})(jQuery)