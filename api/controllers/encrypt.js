var app = require('../../app');
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function check(str){
  if(str.search(/[0-9+abcdef]/g) !== -1 ) return true;
  return false;
}

function getvalue(req){
  var reqSth = {
    url : 'https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt',
    headers:{
      'content-type' : 'application/json'
    },
    body : JSON.stringify(req)
  }
  return request.post(reqSth, function(req, res, body){
    console.log(body);
    return body;
  })
}

app.post('/encrypt', function encrypt(req, res){
  var plain = req.body.plaintext;
  //console.log(req.headers);
  if(req.headers['content-type'] !== 'application/json' || plain === undefined || check(plain) === false)
    res.json(400, {
      message: "給人看的錯誤說明",
    });
  var ciphertext = getvalue({"plaintext" : plain});
  //console.log(ciphertext);
  res.json(200, {
    ciphertext
  })

})
