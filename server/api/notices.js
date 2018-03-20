var express  = require('express');
var router   = express.Router();
var db = require('../dbconnection');
var util     = require('../util');

router.get('/',
  function(req, res){

    var sql = global.noticeSql;
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


module.exports = router;
