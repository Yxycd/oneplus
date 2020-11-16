import '../js/jquery.js';
// console.log($);
import './jquery.md5.js';


let reg1 = /^1[3-9]\d{9}$/;

function check() {
    var Pass = document.querySelectorAll('#username[dateset-pass="ture"]');
    if (Pass.length === 1) {
        $('.tes').text((Math.random().toString(36).substring(3, 7))),
        $('.tes').css({"background":"#eb0028"}),
        $('.tes').css({"color":"#fff"})
    }else{
        $('.tes').text("获取验证码"),
        $('.tes').css({"background":"#dad9d9"})
    }
};



$(
    $('#username').on('input', () => {
        // console.log($('#username').val());
        if (reg1.test($('#username').val())) {
            $('#username').attr({ 'dateset-pass': 'ture' });
        } else {
            $('#username').attr({ 'dateset-pass': 'false' });
        }
        check();

    }),
    $('.sp1').on('click',()=>{
        $('.sp1').css({"border-color":"#eb0028"}),
        $('.sp2').css({"border-color":"transparent"});
        $('.firs').show();
        $('.seco').hide();
    }),
    $('.sp2').on('click',()=>{
        $('.sp2').css({"border-color":"#eb0028"});
        $('.sp1').css({"border-color":"transparent"});
        $('.seco').show();
        $('.firs').hide();

    }),
    $('#submit').on('click',function(){
        console.log(1);
        let password = $.md5($('[name=password]').val());
        $.ajax({
            type:"post",
            url:"http://localhost:8088/users/login",
            data:{
                phone:$('[name=username]').val(),
                password:password,
            },
            dataType:"json",
            success:function(res){
                if(res == '用户名或密码错误'){
                    alert(res);
                }else{
                    history.go(-1);
                }
            }
        });

    })
);