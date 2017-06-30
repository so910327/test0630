var URLSafeBase64 = require('urlsafe-base64');
let now = new Date();
var bodyParser = require('body-parser');

var db = [];

function checkValue(path){
  var indexOfPath = db.findIndex(i => i.VALUE === path);
  if(indexOfPath === -1) return false;
  return indexOfPath;
}

function getKEY(req, res) {
  var path = req.path.slice(4);
  if(!URLSafeBase64.validate(path))
    res.json(400, {
      message: "400 Bad Request",
    })
  console.log(checkValue(path));
  if(checkValue(path) === false)
    res.json(404, {
      message: "value not exit",
    });
  else{
    res.json(200, {
      VALUE: path,
      TS: now,
   });
   console.log(db);
  }
}


function deleteKEY(req, res) {
  var path = req.path.slice(4);
  if(!URLSafeBase64.validate(path))
    res.json(400, {
      message: "400 Bad Request",
    })
  if(checkValue(path) === false)
    res.json(404, {
      TS: now,
    });
  else{
    db.splice(checkValue(path), 1);
    res.json(200, {
      OLD_VALUE: path,
      TS: now,
    });
    console.log(db);
 }
}

function postKEY(req, res) {
  var path = req.path.slice(4);
  if(!URLSafeBase64.validate(path))
    res.json(400, {
      message: "400 Bad Request",
  })
  res.json(200, {
    TS: now,
  })
  var json=({
    VALUE : req.body.VALUE,
    TS : now
  })
  db.push(json);
  console.log(db);
}

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}
