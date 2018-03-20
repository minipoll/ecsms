var express = require('express');
var app     = express();


var path    = require('path');
var bodyParser = require('body-parser');

var fs = require('fs');
var xml_digester = require("xml-digester");
var digester = xml_digester.XmlDigester({});
// Database

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type,x-access-token');
  next();
});



// API
app.use('/api/auth', require('./api/auth'));
app.use('/api/shop', require('./api/shop'));
app.use('/api/notices', require('./api/notices'));
app.use('/api/report', require('./api/report'));
app.use('/api/reports', require('./api/reports'));

// Angular
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', function (req, res) {
  var indexFile = path.resolve(__dirname,'../dist/index.html');
  res.sendFile(indexFile);
});

global.jwtSecret = 'minipoll';

// xml
fs.readFile(__dirname + '/sql.xml','utf8', function(error, data) {
  if (error) {
    console.log(error);
  } else {
    digester.digest(data, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        global.shopSql = result.query.shopSql;
        global.loginSql = result.query.loginSql;
        global.refreshSql = result.query.refreshSql;
        global.noticeSql = result.query.noticeSql;
        global.inventorySql = result.query.inventorySql;
        global.invoiceSql = result.query.invoiceSql;
        global.invoiceGegunHeaderSql = result.query.invoiceGegunHeaderSql;
        global.invoiceGegunDetailSql = result.query.invoiceGegunDetailSql;
        global.clsYmdSql = result.query.clsYmdSql;
        global.transactionalReportSql = result.query.transactionalReportSql;
        global.transactionalStatementsHeaderSql = result.query.transactionalStatementsHeaderSql;
        global.transactionalStatementsDetailSql = result.query.transactionalStatementsDetailSql;
        global.requestReleaseSql = result.query.requestReleaseSql;
        global.requestGoodSql = result.query.requestGoodSql;
        global.retrieveRequestRelease = result.query.retrieveRequestRelease;
        global.insertS32rSql = result.query.insertS32rSql;
        global.updateS32rSql = result.query.updateS32rSql;
        global.deleteS32rSql = result.query.deleteS32rSql;
        global.existsRequestSql = result.query.existsRequestSql;

      }
    });
  }
});


// Server
var port = process.env.SERVER_PORT;
var server = app.listen(port, function(){
  console.log('listening on port:' + port);
});
