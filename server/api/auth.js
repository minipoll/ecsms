var express  = require('express');
var router   = express.Router();
var util     = require('../util');
var jwt      = require('jsonwebtoken');
var db = require('../dbconnection');


// login
router.post('/login',
  function(req,res,next){
    console.log(process.env.DB_CONNECTION);
    var isValid = true;
    var validationError = {
      name:'ValidationError',
      errors:{}
    };

    if(!req.body.id){
      isValid = false;
      validationError.errors.id = {message:'Username is required!'};
    }
    if(!req.body.pwd){
      isValid = false;
      validationError.errors.pwd = {message:'Password is required!'};
    }

    if(!isValid) return res.json(util.successFalse(validationError));
    else next();
  },
  function(req,res,next){
    var sql = global.loginSql;
    sql = sql.replace(/@id/gi,'\'' + req.body.id + '\'');
    sql = sql.replace(/@pwd/gi,'\'' +req.body.pwd + '\'');
    console.info(sql);
    var query = db.query(sql, function (err, result, fields) {
      if(err || !result.length) {
        console.log(err);
        return res.json(util.successFalse(null,'Username or Password is invalid'));
      }
      else {
        var payload = {
          id : result[0].ID,
          co : result[0].CO,
        };
        var options = {expiresIn: 60*60*24};
        jwt.sign(payload, global.jwtSecret, options, function(err, token){
          if(err) return res.json(util.successFalse(err));
          res.json(util.successTrue(token));
        });
      }
    });
  }
);

// me
router.get('/me', util.isLoggedin,
  function(req,res,next) {

    console.log('me:' + req.decoded.id);
    var sql = global.refreshSql;
    sql = sql.replace(/@id/gi,'\'' + req.decoded.id + '\'');

    var query = db.query(sql, function (err, result, fields) {
      if(err || !result.length) {
        console.log(err);
        res.json(util.successFalse(err));
      }
      else {
        res.json(util.successTrue(result[0]));
      }
    });
  }
);

// refresh
router.get('/refresh', util.isLoggedin,
  function(req,res,next) {
    console.log('refresh:' + req.decoded.id);
    var sql = global.refreshSql;

    sql = sql.replace(/@id/gi,'\'' + req.decoded.id + '\'');

    var query = db.query(sql, function (err, result, fields) {
      if(err || !result.length) {
        console.log(err);
        res.json(util.successFalse(err));
      }
      else {
        var payload = {
          id : result[0].ID,
          co: result[0].CO
        };

        var options = {expiresIn: 60*60*24};
        jwt.sign(payload, global.jwtSecret, options, function(err, token){
          if(err) return res.json(util.successFalse(err));
          res.json(util.successTrue(token));
        });
      }
    });
  }
);

module.exports = router;
