const express = require('express');
const conn = require('../dao/conn');//链接数据库
const crypto = require('crypto');
const router = express.Router();//获得路由对象



//测试-----------------------------------------
//express支持restful api规范
//定义了很多http动词（get post put d elete）

// router.route('/')
//     .get((req, res, next) => {
//         console.log(req.query);
//         res.json({ 'method': 'get' });
//     })
//     .post((req, res, next) => {
//         res.json(req.body);
//         // res.json({ 'method': 'post' });
//     });
//-------------------------------------------------------

router.route('/')
    .post((req, res, next) => {
        // console.log(req.body);
        let md5 = crypto.createHash('md5');//创建一个哈希加密
        let passResult = md5.update(req.body.password).digest('hex');//加密内容获得16进制结果
        // console.log(passResult);
        let sql = `insert into users(user_phone,user_password)
        values('${req.body.phone}','${passResult}')`;
        // console.log(sql);
        conn.query(sql,(err,result)=>{
            //执行sql语句
            if(err) console.log(err);
            // console.log(result);
            if(result.insertId) {
                res.cookie('phone',req.body.phone);
                res.cookie('isLogined',true);
                res.json({msg:"注册成功"});
            }
        });
    });

router.route('/login')
.post((req,res,next)=>{
    console.log(req.cookies);
})

module.exports = router;//导出路由模块