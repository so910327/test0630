var bodyParser = require('body-parser');
var request = require('request');

function check(str){
  if(str.search(/[^0-9a-f]/gi) > -1 ) return false;
  return true;
}

function getvalue(req){
  req = JSON.stringify(req);
  var reqSth = {
    url : 'https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt',
    headers : {
      'content-type' : 'application/json'
    },
    body : req
  }
  var require = request.post(reqSth, function(err, res){
    var cipher = JSON.parse(res.body).ciphertext;
    //res.send(res.body);
    console.log(cipher);
    return cipher;
  })
  return require;
}

function encrypt(req, res){
  var plain = req.body.plaintext;
  //console.log(check(plain));
  if(req.headers['content-type'] !== 'application/json' || plain === undefined || check(plain) === false)
    res.json(400, {
      message: "給人看的錯誤說明",
    });
  var cipher =getvalue({"plaintext" : plain});
  if(cipher.length >= 32)
    res.json(413, {
      message: "給人看的錯誤說明",
    })
  res.json(200, {
    "ciphertext" : cipher
  })
}

module.exports = {
  encrypt
}
