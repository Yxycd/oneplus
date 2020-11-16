import './jquery.js';
// console.log($);
import './jquery.md5.js';
// console.log($.md5('abc'));
let reg1 = /^1[3-9]\d{9}$/;

let reg2 = /^.{6,16}$/;

let n = 0;
function check() {
    var allPass = document.querySelectorAll('.yy[dateset-pass="ture"]');
    // console.log(allPass.length);
    // console.log(submit);
    if (allPass.length === 4) {
        $('.submit').removeAttr('disabled');
        $('.submit').css({"background":"#eb0028"});
        $('.submit').css({"cursor":"pointer"});
        $('.submit').css({"color":"#fff"})
    }else{
        $('.submit').css({"background":"#e9e9e9"});
        $('.submit').css({"cursor":"default"});
        $('.submit').css({"color":"#9b9b9b"})
    }
};



$(
    $('.tes').text((Math.random().toString(36).substring(3, 7))),
    //console.log( $('.tes').text()),
    $('#username').on('input', () => {
        // console.log($('#username').val());
        if (reg1.test($('#username').val())) {
            $('.z1').text('通过验证');
            $('.z1').attr({ 'dateset-pass': 'ture' });
        } else {
            $('.username').text('未通过验证');
            $('.z1').attr({ 'dateset-pass': 'false' });
        }
        check();

    }),
    $('#tes').on('input', () => {
        // console.log($('#tes').val());输入的验证码
        if(($('#tes').val())== $('.tes').text()){
            $('.z2').text('通过验证');
            $('.z2').attr({ 'dateset-pass': 'ture' });
        }else{
            $('.z2').text('未通过验证');
            $('.z2').attr({ 'dateset-pass': 'false' });
        }
        check();

    }),
    $('#password').on('input', () => {
        // console.log($('#password').val());
        if (reg2.test($('#password').val())) {
            $('.password').text('通过验证');
            $('.password').attr({ 'dateset-pass': 'ture' });
        } else {
            $('.password').text('未通过验证');
            $('.z3').attr({ 'dateset-pass': 'false' });
        }
        check();

    }),
    $('.agree').on('click',()=>{
        n++;
        if(n%2==1){
            $('.agree').attr({ 'dateset-pass': 'ture' });
        }else{
            $('.agree').attr({ 'dateset-pass': 'false' });
        }
        check();
    }),
    $('#submit').on('click',function(){
        let password = $.md5($('[name=password]').val());
        $.ajax({
            type:"post",
            url:"http://localhost:8088/users/register",
            data:{
                phone:$('[name=username]').val(),
                password:password,
            },
            dataType:"json",
            success:function(res){
                if(res == '用户号码已存在'){
                    alert(res);
                }else{
                    window.location.href = '../html/login.html';
                }
            }
        });

    })
)

