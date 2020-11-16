const express = require('express');
const conn = require('../dao/conn');

const router = express.Router();

router.route('/getProducts')
    .get((req, res, next) => {
        let sql = 'select * from products'
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    });

router.route('/getItem')
    .get((req, res, next) => {

        let sql = `select * from products where pro_id='${req.query.id}'`;
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        });
    });

router.route('/getItems')
    .get((req, res, next) => {
        let sql = `select * from products where pro_id in(${req.query.idList})`;
        conn.query(sql,(err,result)=>{
            if(err) console.log(err);
            res.json(result);
        })
    });

module.exports = router;