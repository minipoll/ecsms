var express  = require('express');
var router   = express.Router();
var request = require('request');
var db = require('../dbconnection');
var fs = require('fs');
var path    = require('path');
var util     = require('../util');
var reportUri = process.env.REPORT_URI;
//reportUri = 'http://localhost:8080/reporting/api/report'; 
//var toUnnamed = require('named-placeholders')();
router.post('/inventory-report1',
  function(req, res, next){
    var sql = global.inventorySql;
    sql = sql.replace(/@cust/gi,'\'' + req.body.cust + '\'');
    sql = sql.replace(/@fromDt/gi,'\'' +req.body.fromDt + '\'');
    sql = sql.replace(/@toDt/gi,'\'' +req.body.toDt + '\'');
    sql = sql.replace(/@goodn/gi,'\'' +req.body.goodn + '\'');
    sql = sql.replace(/@blno/gi,'\'' +req.body.blno + '\'');
    sql = sql.replace(/@org/gi,'\'' +req.body.org + '\'');
    sql = sql.replace(/@ent1/gi,'\'' +req.body.ent1 + '\'');
    sql = sql.replace(/@ent2/gi,'\'' +req.body.ent2 + '\'');
    sql = sql.replace(/@lotno1/gi,'\'' +req.body.lotno1 + '\'');
    console.log(sql);
    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        return res.json(util.successFalse(null,err));
      }
      else {
        var provider = JSON.stringify({shop:global.shop,now:util.now(),custNm:req.body.CUSTNM,fromDt:req.body.fromDt,toDt:req.body.toDt});
        var items = JSON.stringify(result);
        var jsonData = {provider:JSON.parse(provider), items:JSON.parse(items)};
        var data ={
          template:{shortid:'r1Bku-LQM'},
          data:jsonData,
          options:{
            preview:true
          }
        };
        var options = {
          uri:reportUrl,
          method:'POST',
          json:data
        };
        request(options).pipe(res);
      }
    });
  }
);

router.post('/invoice',
  function(req, res, next){
    var sql = global.invoiceSql;
    sql = sql.replace(/@cust/gi,'\'' + req.body.cust + '\'');
    sql = sql.replace(/@fromDt/gi,'\'' +req.body.fromDt + '\'');
    sql = sql.replace(/@toDt/gi,'\'' +req.body.toDt + '\'');
    sql = sql.replace(/@goodn/gi,'\'' +req.body.goodn + '\'');
    sql = sql.replace(/@blno/gi,'\'' +req.body.blno + '\'');
    sql = sql.replace(/@org/gi,'\'' +req.body.org + '\'');
    sql = sql.replace(/@send/gi,'\'' +req.body.SEND + '\'');
    sql = sql.replace(/@ent2/gi,'\'' +req.body.ent2 + '\'');

    console.log(sql);
    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        return res.json(util.successFalse(null,err));
      }
      else {
        var provider = JSON.stringify({shop:global.shop,now:util.now(),custNm:req.body.CUSTNM,fromDt:req.body.fromDt,toDt:req.body.toDt});
        var items = JSON.stringify(result);
        var jsonData = {provider:JSON.parse(provider), items:JSON.parse(items)};
        var data ={
          template:{shortid:'rkJTnK2ce'},
          data:jsonData,
          options:{
            preview:true
          }
        };
        var options = {
          uri:reportUri,
          method:'POST',
          json:data
        };
        request(options).pipe(res);
      }
    });
  }
);

router.post('/invoceGegun',
function(req, res){
    var sql = global.invoiceGegunHeaderSql;
    sql = sql.replace(/@keyg/gi,'\'' + req.body.keyG + '\'');
    console.log(sql);
    var provider;
    var items;

    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        console.log(err);
        res.status(500);
        return;
      }
      else {
        provider = result[0];
        provider.shop = global.shop;
        provider.now = util.now();
        provider = JSON.stringify(provider);
        sql = global.invoiceGegunDetailSql;
        sql = sql.replace(/@keyg/gi,'\'' + req.body.keyG + '\'');

        console.log(sql);
        query = db.query(sql, function (err, result, fields) {
          if(err) {
            console.log(err);
            res.status(500);
            return;
          }
          else {

            items = JSON.stringify(result);
            var jsonData = {provider:JSON.parse(provider), items:JSON.parse(items)};
            var data ={
              template:{shortid:'BJHtELfzG'},
              data:jsonData,
              options:{
                preview:true
              }
            };
            var options = {
              uri:reportUri,
              method:'POST',
              json:data
            };
            request(options).pipe(res);
          }
        });
      }
    });
  }
);
router.post('/transactionalStatements',
  function(req, res){
    var sql = global.transactionalStatementsHeaderSql;
    sql = sql.replace(/@cust/gi,'\'' + req.body.cust + '\'');
    sql = sql.replace(/@fromDt/gi,'\'' +req.body.fromDt + '\'');
    console.log(sql);
    var provider;
    var items;

    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        console.log(err);
        res.status(500);
        return;
      }
      else {
        provider = result[0];
        provider.shop = global.shop;
        provider.now = util.now();
        provider = JSON.stringify(provider);
        console.log(provider);
        sql = global.transactionalStatementsDetailSql;
        sql = sql.replace(/@cust/gi,'\'' + req.body.cust + '\'');
        sql = sql.replace(/@fromDt/gi,'\'' +req.body.fromDt + '\'');

        console.log(sql);
        query = db.query(sql, function (err, result, fields) {
          if(err) {
            console.log(err);
            res.status(500);
            return;
          }
          else {

            items = JSON.stringify(result);
            var jsonData = {provider:JSON.parse(provider), items:JSON.parse(items)};
            var data ={
              template:{shortid:'rJfLuP9bM'},
              data:jsonData,
              options:{
                preview:true
              }
            };
            var options = {
              uri:reportUri,
              method:'POST',
              json:data
            };
            request(options).pipe(res);
          }
        });
      }
    });
  }
);



module.exports = router;
