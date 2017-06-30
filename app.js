'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();
var kv = require('./api/controllers/kv');
var URLSafeBase64 = require('urlsafe-base64');
var request = require('request');


module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};


app.get('/kv/:id', function(req, res){
  var id = req.params.id;
  console.log('getting!');
  if(!URLSafeBase64.validate(id)) res.status(400).json({ error: 'message' });
  var getkey = kv.getKEY(req, res);
  res.send(getkey);
  //console.log(id);
})

app.post('/kv/:id', function(req, res){
  var id = req.params.id;
  console.log('posting!');
  res.writeHead(200, {"Content-type" : "application/json"});
  var json = JSON.stringify({
    VALUE : id,
    TS : new Date(),
  });
  res.send(json);
})

SwaggerRestify.create(config, function(err, swaggerRestify) {
  if (err) { throw err; }

  swaggerRestify.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log(`Listening on http://127.0.0.1:${port}`);
});
