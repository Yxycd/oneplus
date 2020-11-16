import './jquery.js';
// import './jquery.lazyload.min.js';

const baseUrl = 'http://localhost:8088';

// $("img.lazy").lazyload({effect: "fadeIn"});

(function(){ 
    $.ajax({ 
        type:"get",
        url:`${baseUrl}/product/getProducts `,
        dataType:"json",
        success:function(res){
            // console.log(res);
            let tempLi = '';
            res.forEach((elm,i)=> {
                // console.log(elm);

                let picture = JSON.parse(elm.picture);
                console.log(picture);
                tempLi+=`<a href="../html/productss.html?id=${elm.pro_id}">
                <div class="top">
                    <span>含赠品</span>
                    <span>低至8.9折</span>
                </div>
                <div class="bot">
                    <div class="then">
                        <div class="im">
                            <img src="${picture[0].src}" class="lazy" alt="">
                        </div>
                        <div class="text">
                            <span>*产品图片仅供参考  请以实物为准</span><br>
                            <span>5款</span>
                            <p>${elm.pro_name}</p>
                            <p><span>最低价¥${elm.oldprice}</span> 最低价¥${elm.price}</p>
                        </div>
                    </div>
                </div>
            </a>`;
            });
            $('.sec1').append(tempLi);
        }
    });
})();