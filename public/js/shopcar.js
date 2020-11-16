import './jquery.js';
import cookie from './cookie.js';
const baseUrl = 'http://localhost:8088';

(function () {

    let shop = cookie.get('shop');
    // console.log(shop);
    if (shop) {//有cookie数据
        shop = JSON.parse(shop);

        let idList = shop.map(elm => elm.id).join();
        $.ajax({
            type: "get",
            url: `${baseUrl}/product/getItems`,
            data: {
                idList: idList
            },
            dataType: "json",
            success: function (res) {
                // console.log(res);
                //现在遍历数据时是按照数据库查询得到的结果遍历
                //cookie中存放的数据 的顺序 和 查询结果的顺序不同
                //需要让cookie中的id和查询结果的id一一对应

                

                let template = '';
                res.forEach((elm, i) => {
                    let arr = shop.filter(val=>val.id===elm.pro_id);
                    console.log(arr);
                    let picture = JSON.parse(elm.picture);
                    template += `<ul class="itemlist clear">
                    <li class="item clear">
                        <div class="p-box">  
                            <label class="checkBox"><input type="checkbox"></label>
                        </div>
                        <div class="p-img">
                            <img src="${picture[0].src}" alt="">
                        </div>
                        <div class="p-name">
                            ${elm.pro_name}
                        </div>
                        <div class="p-price">
                            ￥：${elm.price}
                        </div>
                        <div class="p-num">
                            <ul class="count">
                                <li><span id="num-jian" class="num-jian">-</span></li>
                                <li><input type="text" class="input-num" id="input-num" value="${arr[0].num}" /></li>
                                <li><span id="num-jia" class="num-jia">+</span></li>
                            </ul>
                        </div>
                        <div class="p-del">
                            <a href="#" class="iconfont de">&#xe632;</a>
                        </div>
                    </li>
                </ul>`;
                });
                $('.date').append(template);

            }
        });

        // console.log(shop);
    }


})();