const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

const app = express();

const usersRouter = require('./router/users');//导入路由模块
const productRouter = require('./router/product');


let conf = {
    port: 8088,
    host: 'localhost'
};


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // post表单数据解析成json 

app.use(cookieParser());

app.use('/users', usersRouter);//使用usersRouter路由中间件
app.use('/product',productRouter);

//自定义一个错误中间件，当请求一个不存在的路径时，会被触发
app.use(function (req, res, next) {
    next(createError(404));//创建一个404错误
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.redirect('/html/404.html');
})

app.listen(conf.port, conf.host, () => {
    console.log(`server is running on http://${conf.host}:${conf.port}`);
});