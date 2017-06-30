var app = require('../../app');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/encrypt', function encrypt(req, res){
  var plain = req.body.plaintext;
  var hexValue = plain.toString(16);
  if(hexValue !== plain)
    res.json(400);
  plain = parseInt(hexValue, 16);
  //plain =

  //if(plain.length)
  res.json(200, {
    ciphertext: plain
  })

})
