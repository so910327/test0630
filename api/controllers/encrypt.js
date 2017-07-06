var bodyParser = require('body-parser');
var request = require('request');

function check(str){
  return (str.match(/[0-9a-fA-F]/) === null ) ? false : true;
}

function encrypt(req, res){
  var plain = req.body.plaintext;
  //console.log(check(plain));
  if(req.headers['content-type'] !== 'application/json' || !check(plain) || plain === undefined)
    return res.json(400, {
      "message": "Bad Request",
    });
  var req = JSON.stringify({"plaintext" : plain});
  var reqSth = {
    url : 'https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt',
    headers : {
      'content-type' : 'application/json'
    },
    body : req
  }
  request.post(reqSth, function(err, response, body){
    var cipher = JSON.parse(response.body).ciphertext;
    if(cipher === undefined)
      retres.json(400, {
        "message": "Bad Request",
      });
    if(cipher.length > 32)
      return res.json(413, {
        "message": "Too Long",
      })
    return res.json(200, {
      "ciphertext" : cipher
    })
  })
}

module.exports = {
  encrypt,
}
