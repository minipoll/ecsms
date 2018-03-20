var jwt = require('jsonwebtoken');

var util = {};

util.now = function(){
  var d = new Date();
  dformat = [d.getFullYear(),
             pad(d.getMonth()+1,2),
             pad(d.getDate(),2)
           ].join('/')+' '+
          [pad(d.getHours(),2),
           pad(d.getMinutes(),2),
           pad(d.getSeconds(),2)].join(':');
  return dformat;
};
function pad(number, length) {

        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }

        return str;

}

util.successTrue = function(data){
  return {
    success:true,
    message:null,
    errors:null,
    data:data
  };
};

util.successFalse = function(err, message){
  if(!err&&!message) message = 'data not found';
  return {
    success:false,
    message:message,
    errors:(err)? util.parseError(err): null,
    data:null
  };
};

util.parseError = function(errors){
  var parsed = {};
  if(errors.name == 'ValidationError'){
    for(var name in errors.errors){
      var validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  } else if(errors.code == '11000' && errors.errmsg.indexOf('id') > 0) {
    parsed.id = { message:'This username already exists!' };
  } else {
    parsed.unhandled = errors;
  }
  return parsed;
};


// middlewares
util.isLoggedin = function(req,res,next){
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.json(util.successFalse(null,'token is required!'));
  }
  else {
    jwt.verify(token, global.jwtSecret, function(err, decoded) {
      if(err) {
        return res.json(util.successFalse(err));
      }
      else{
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = util;
