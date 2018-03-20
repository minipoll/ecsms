var express  = require('express');
var router   = express.Router();
var db = require('../dbconnection');
var util     = require('../util');
var async = require("async");

router.post('/inventory',
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
        res.json(util.successTrue(result));
      }
    });
  }
);

router.post('/lastClsYmd',
  function(req, res, next){
    var sql = global.clsYmdSql;
    sql = sql.replace(/@cust/gi,'\'' + req.body.cust + '\'');

    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        return res.json(util.successFalse(null,err));
      }
      else {
        res.json(util.successTrue(result));
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
        res.json(util.successTrue(result));
      }
    });
  }
);

router.post('/requestRelease',
  function(req, res, next){
    var sql = global.requestReleaseSql;
    sql = sql.replace(/@cust/gi,'\'' + req.body.cust + '\'');
    sql = sql.replace(/@reqDt/gi,'\'' +req.body.reqDt + '\'');
    sql = sql.replace(/@goodn/gi,'\'' +req.body.goodn + '\'');
    sql = sql.replace(/@goodn/gi,'\'' +req.body.goodn + '\'');
    sql = sql.replace(/@blno/gi,'\'' +req.body.blno + '\'');
    sql = sql.replace(/@ctno/gi,'\'' +req.body.ctno + '\'');
    sql = sql.replace(/@lotno1/gi,'\'' +req.body.lotno1 + '\'');

    console.log(sql);
    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        return res.json(util.successFalse(null,err));
      }
      else {
        res.json(util.successTrue(result));
      }
    });
  }
);

router.post('/requestGood',
  function(req, res, next){
    var sql = global.requestGoodSql;
    sql = sql.replace(/@cust/gi,'\'' + req.body.CUST + '\'');
    sql = sql.replace(/@goodn/gi,'\'' +req.body.GOOD + '\'');
    sql = sql.replace(/@rmno/gi,'\'' +req.body.RMNO + '\'');
    sql = sql.replace(/@lotno1/gi,'\'' +req.body.LOTNO1 + '\'');
    sql = sql.replace(/@lotno2/gi,'\'' +req.body.LOTNO2 + '\'');
    sql = sql.replace(/@blno/gi,'\'' +req.body.BLNO + '\'');
    sql = sql.replace(/@ctno/gi,'\'' +req.body.CTNO + '\'');
    sql = sql.replace(/@brand/gi,'\'' +req.body.BRAND + '\'');
    sql = sql.replace(/@grade/gi,'\'' +req.body.GRADE + '\'');
    sql = sql.replace(/@estno/gi,'\'' +req.body.ESTNO + '\'');
    sql = sql.replace(/@iodt/gi,'\'' +req.body.IODT + '\'');

    console.log(sql);
    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        return res.json(util.successFalse(null,err));
      }
      else {
        res.json(util.successTrue(result));
      }
    });
  }

);

router.post('/retrieveRequestRelease',
  function(req, res, next){
    var sql = global.retrieveRequestRelease;
    sql = sql.replace(/@CUST2/gi,'\'' +req.body.cust + '\'');
    sql = sql.replace(/@CUST/gi,'\'' + req.body.cust + '\'');
    sql = sql.replace(/@REQDT/gi,'\'' +req.body.reqDt + '\'');

    console.log(sql);
    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        return res.json(util.successFalse(null,err));
      }
      else {
        return res.json(util.successTrue(result));
      }
    });
  }
);

router.post('/transactionalReport',
  function(req, res, next){
    var sql = global.transactionalReportSql;
    sql = sql.replace(/@cust/gi,'\'' +req.body.cust + '\'');
    sql = sql.replace(/@fromDt/gi,'\'' + req.body.fromDt + '\'');
    sql = sql.replace(/@toDt/gi,'\'' +req.body.toDt + '\'');

    console.log(sql);
    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        return res.json(util.successFalse(null,err));
      }
      else {
        return res.json(util.successTrue(result));
      }
    });
  }
);

router.post('/saveRequestRelease',
  function(req, res, next){
    console.log(req.body);
    var sql = '';
    async.each(req.body.items, function(item, next) {
      if(item.REQNO){
        sql = global.updateS32rSql;
        sql = sql.replace(/@CUST2/gi,'\'' +item.CUST2 + '\'');
        sql = sql.replace(/@CUST/gi,'\'' + item.CUST + '\'');
        sql = sql.replace(/@REQDT/gi,'\'' +req.body.condition.reqDt + '\'');
        sql = sql.replace(/@REQNO/gi,'\'' +item.REQNO + '\'');
        sql = sql.replace(/@OUTQ/gi,'\'' +item.OUTQ + '\'');
        sql = sql.replace(/@OUTW/gi,'\'' +item.OUTQ*item.WGT + '\'');
        sql = sql.replace(/@SEND2/gi,'\'' +item.SEND2 + '\'');
        sql = sql.replace(/@SEND/gi,'\'' +item.SEND + '\'');
        sql = sql.replace(/@PLATENO/gi,'\'' +item.PLATENO + '\'');
        sql = sql.replace(/@RMK/gi,'\'' +item.RMK + '\'');
      }else{
        sql = global.insertS32rSql;
        sql = sql.replace(/@GOOD/gi,'\'' +item.GOOD + '\'');
        sql = sql.replace(/@CUST2/gi,'\'' +item.CUST2 + '\'');
        sql = sql.replace(/@CUST/gi,'\'' + item.CUST + '\'');
        sql = sql.replace(/@REQDT/gi,'\'' +req.body.condition.reqDt + '\'');
        sql = sql.replace(/@LOTNO1/gi,'\'' + item.LOTNO1 + '\'');
        sql = sql.replace(/@LOTNO2/gi,'\'' + item.LOTNO2 + '\'');
        sql = sql.replace(/@BLNO/gi,'\'' + item.BLNO + '\'');
        sql = sql.replace(/@CTNO/gi,'\'' + item.CTNO + '\'');
        sql = sql.replace(/@BRAND/gi,'\'' + item.BRAND + '\'');
        sql = sql.replace(/@GRADE/gi,'\'' + item.GRADE + '\'');
        sql = sql.replace(/@ESTNO/gi,'\'' + item.ESTNO + '\'');
        sql = sql.replace(/@ENTNO/gi,'\'' + item.ENTNO + '\'');
        sql = sql.replace(/@RMNO/gi,'\'' + item.RMNO + '\'');
        sql = sql.replace(/@OUTQ/gi,'\'' + item.OUTQ + '\'');
        sql = sql.replace(/@OUTW/gi,'\'' +item.OUTQ*item.WGT + '\'');
        sql = sql.replace(/@SEND2/gi,'\'' +item.SEND2 + '\'');
        sql = sql.replace(/@SEND/gi,'\'' +item.SEND + '\'');
        sql = sql.replace(/@PLATENO/gi,'\'' +item.PLATENO + '\'');
        sql = sql.replace(/@REQYN/gi,'\'' + 0 + '\'');
        sql = sql.replace(/@SMSYN/gi,'\'' + 0 + '\'');
        sql = sql.replace(/@SMSUR/gi,'\'' + '' + '\'');
        sql = sql.replace(/@SMSDATE/gi,'\'' + '' + '\'');
        sql = sql.replace(/@RMK/gi,'\'' +item.RMK + '\'');
        sql = sql.replace(/@IODT/gi,'\'' +item.IODT + '\'');
        sql = sql.replace(/@URNO/gi,'\'' + '' + '\'');
        sql = sql.replace(/@GUBN/gi,'\'' + '21' + '\'');
        sql = sql.replace(/@SRNO/gi,'\'' + '' + '\'');
        sql = sql.replace(/@SQNO/gi,'\'' + '' + '\'');
        sql = sql.replace(/@CRUR/gi,'\'' +item.CRUR + '\'');
        sql = sql.replace(/@UPUR/gi,'\'' +item.UPUR + '\'');
      }
      console.log(sql);
      var query = db.query(sql, function (err, result, fields) {
        if(err) {
          console.log('inside:'+err);
          return res.json(util.successFalse(null,err));
        }
        else {
          next();
        }
      });
    }, function(err) {
        if(err) {
          console.log('outside:'+err);
          return res.json(util.successFalse(null,err));
        }
        else {
          sql = global.retrieveRequestRelease;
          sql = sql.replace(/@CUST2/gi,'\'' +req.body.condition.cust + '\'');
          sql = sql.replace(/@CUST/gi,'\'' + req.body.condition.cust + '\'');
          sql = sql.replace(/@REQDT/gi,'\'' +req.body.condition.reqDt + '\'');

          console.log(sql);
          var query = db.query(sql, function (err, result, fields) {
            if(err) {
              return res.json(util.successFalse(null,err));
            }
            else {
              return res.json(util.successTrue(result));
            }
          });
        }
    });
  }
);

module.exports = router;
