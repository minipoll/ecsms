var express  = require('express');
var router   = express.Router();
var util     = require('../util');
var db = require('../dbconnection');

router.get('/',
  function(req, res, next){
    console.log('dfdf');
    var sql = global.shopSql;
    console.log(sql);
    var query = db.query(sql, function (err, result, fields) {
      if(err) {
        return res.json(util.successFalse(null,err));
      }
      else {
        global.shop = result[0].CO;
        res.json(util.successTrue(result));
      }
    });
  }
);


module.exports = router;
