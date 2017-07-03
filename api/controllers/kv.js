var URLSafeBase64 = require('urlsafe-base64');
var bodyParser = require('body-parser');

let now = new Date();
var db = [];

function checkValue(path){
  var indexOfPath = db.findIndex(i => i.VALUE === path);
  if(indexOfPath === -1) return false;
  return indexOfPath;
}

function getKEY(req, res) {
  var path = req.path.slice(4);
  console.log(checkValue(path));
  if(checkValue(path) === false)
    res.json(404, {
      message: "給人看的錯誤說明",
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
    return res.json(400, {
      message: "給人看的錯誤說明",
  })
  console.log('saveBase64');
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
