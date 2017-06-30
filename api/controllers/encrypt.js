var app = require('../../app');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function stringtohex(tmp){
  var str = '';
  for(var i=0; i<tmp.length; i++)
    str += tmp[i].charCodeAt(0).toString(16);
    return str;
}

function check(str){
  if(str.search(/[0-9+abcdef]/g) !== -1 ) return true;
  return false;
}

app.post('/encrypt', function encrypt(req, res){
  var plain = req.body.plaintext;
  //var hexValue = plain.toString(16);
  //hexValue = parseInt(hexValue, 16);
  var key = fromCharCode(parseInt(plain, 16));
  if(check(plain) === false)
    res.json(400);
    res.json(200, {
      ciphertext : key
  })
})
