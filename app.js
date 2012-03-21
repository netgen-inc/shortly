var express = require('express');
var argv = require('optimist').argv;
var shortly = require('./lib/shortly');
var store = require('./lib/store');

var defaultUrl = 'http://gupiao123.cn/';
var baseUrl = 'http://j.gupiao123.cn/';

var app = express.createServer();

app.get('/', function(req, res){
  res.redirect( defaultUrl );
});

app.get(/^\/([a-zA-Z0-9]{6})$/, function(req, res){
  var longUrl = store.findUrl( req.params[0] ) || defaultUrl;
  res.redirect( longUrl );
});

app.get('/v1/shorten', function(req, res){
  var hash = store.findHash( req.query.longUrl, shortly.hasher );
  
  var ret = {
    "status_code": 200,
    "data": {
      "url": baseUrl + hash,
      "hash": hash,
      "long_url": req.query.longUrl
    }, 
    "status_txt": "OK"
  };
  res.send( JSON.stringify( ret, null, '  ' ) );
});

app.listen( argv.p || 80 );
