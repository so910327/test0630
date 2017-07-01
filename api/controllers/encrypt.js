var bodyParser = require('body-parser');
var request = require('request');

function check(str){
  if(str.search(/[^0-9a-f]/gi) > -1 ) return false;
  return true;
}

function encrypt(req, res){
  var plain = req.body.plaintext;
  //console.log(check(plain));
  if(req.headers['content-type'] !== 'application/json' || plain === undefined || check(plain) === false)
    res.json(400, {
      message: "給人看的錯誤說明",
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
      //res.send(res.body);
      console.log(body);
      if(cipher.length > 32)
        res.json(413, {
          message: "給人看的錯誤說明",
        })
      res.json(200, {
        "ciphertext" : cipher
      })
      res.end();
    })

}

module.exports = {
  encrypt
}
