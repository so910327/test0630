let now = new Date();

function getKEY(req, res) {
  res.json(404, {
    VALUE: "hello world",
    TS: now,
  })
}

function deleteKEY(req, res) {
  res.json(200, {
    TS: now,
  })
}

function postKEY(req, res) {
  res.json(200, {
    TS: now,
  })
}


module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}
