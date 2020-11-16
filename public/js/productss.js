import './jquery.js';
const baseUrl = 'http://localhost:8088';
import cookie from './cookie.js';

(function () {
    let id = location.search.split('=')[1];
    // console.log(id);
    $.ajax({
        type: "get",
        url: "http://localhost:8088/product/getItem",
        data: {
            id: id,
        },
        dataType: "json",
        success: function (res) {
            res = res[0];
            // console.log(res);
            let picture = JSON.parse(res.picture);
            let template = `
            <div class="imgg left">
                <div class="showing">
                    <img src="${picture[0].src}" alt="" class="hi">
                </div>
                <ul class="small">
                    <li><img src="${picture[0].src}" alt=""></li>
                    <li><img src="${picture[1].src}" alt=""></li>
                    <li><img src="${picture[2].src}" alt=""></li>
                    <li><img src="${picture[3].src}" alt=""></li>
                </ul>
            </div>
            <div class="mesage right">
                <div class="tips">
                    <h1>${res.pro_name}</h1>
                    <p>${res.title}</p>
                    <span>￥${res.price}</span>
                </div>
                <div class="choose">
                    <div class="colo">
                        <p>颜色</p>
                        <a href="#">青域</a>
                        <a href="#">银时</a>
                    </div>
                    <div class="mesa">
                        <p>规格</p>
                        <a href="#">8GB+128GB</a>
                        <a href="#">12GB+256GB</a>
                    </div>
                    <div class="huabei">
                        <p>花呗分期</p>
                        <a href="#">￥1159.6 x 3期</a>
                        <a href="#">￥591.6 x 6期</a>
                        <a href="#">￥305.6 x 12期</a>
                    </div>
                    <div class="num">
                        <p>选择数量</p>
                        <ul class="count">
                            <li><span id="num-jian" class="num-jian">-</span></li>
                            <li><input type="text" class="input-num" id="input-num" value="0" /></li>
                            <li><span id="num-jia" class="num-jia">+</span></li>
                        </ul>
                    </div>
                    <input type="button" value="加入购物车" id="additem" class="butt"></input>
                </div>
            </div>`;
            $('.sec-1').append(template).find('#additem').on('click', function () {
                addItem(res.pro_id, $('.input-num').val());
            });

            $(
                $('.small>li>img').on('click', function () {

                    $('.hi').hide();
                    // 1. 将图片展示到showing
                    $('.showing').css('background-image', 'url(' + $(this).attr('src') + ')');

                }),
                $('#num-jian').on('click', () => {

                    if ($('.input-num').val() <= 1) {
                        $('.input-num').val(1);
                    } else {
                        $('.input-num').val(parseInt($('.input-num').val()) - 1);
                    }

                }),
                $('#num-jia').on('click', () => {

                    if ($('.input-num').val() >= 2) {
                        $('.input-num').val(2);
                    } else {
                        $('.input-num').val(parseInt($('.input-num').val()) + 1);
                    }
                })
            );

        }
    });

    function addItem(id, num) {
        let shop = cookie.get('shop');//从cookie中获得shop数据

        let product = {
            id: id,
            num: num
        }

        if (shop) {//判断是否存有购物车数据
            shop = JSON.parse(shop);//将取出的cookie字符串转换成对象

            //判断cookie中的购物车数据 是否已存在本条数据的id
            //如果本条数据的id已存在，修改数量
            if (shop.some(elm => elm.id == id)) {
                shop.forEach(el => {
                    el.id === id ? el.num = num : null;
                })
            }else{
                shop.push(product);
            }

            // console.log(shop);
            

        } else {//cookie中不存在shop数据
            shop = [];//设置一个数组
            shop.push(product);//将当前商品存入数组
        }

        cookie.set('shop', JSON.stringify(shop), 1);
    }

})();
