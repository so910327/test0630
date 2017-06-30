var URLSafeBase64 = require('urlsafe-base64');
let now = new Date();

var db = [];

function getKEY(req, res) {
  var path = req.path+"";
  path = path.slice(4);
  var indexOfPath = db.findIndex(i => i.VALUE === path);
  console.log(indexOfPath+'----'+path);
  if(!URLSafeBase64.validate(path))
    res.json(400, {
      message: "400 Bad Request"
    })
  if(indexOfPath === -1)
    res.json(404, {
      message: "value not exit"
    });
  else{
    res.json(200, {
      VALUE: path,
      TS: now,
   });
  }
}


function deleteKEY(req, res) {
  var path = req.path+"";
  path = path.slice(4);
  var indexOfPath = db.findIndex(i => i.VALUE === path);
  if(!URLSafeBase64.validate(path))
    res.json(400, {
      message: "400 Bad Request"
    })
  if(indexOfPath === -1)
    res.json(404, {
      TS: now,
      message: "value not exit"
    });
  else{
    res.json(200, {
      OLD_VALUE: path,
      TS: now,
   });
}
}

function postKEY(req, res) {
  var path = req.path+"";
  path = path.slice(4);
  if(!URLSafeBase64.validate(path))
    res.json(400, {
      message: "400 Bad Request"
  })
  res.json(200, {
    TS: now,
  })
  var json=({
    VALUE : path,
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
