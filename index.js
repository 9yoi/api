const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const db = require ('./db.js');
const User = db.User;
const fs = require ('fs');

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// connect mySQL, create database and schema           
db.connect();

// ENDPOINTS

// Receive Phase 1 data
// Example request format: 
// {"userId":"123", "firstName":"Mei", "lastName": "Png", "fileType": "txt", "fileTag": "mortgage"}
app.post('/api/user', function (req, res) {
  var user = req.body;
  // For development, drop tables then create new if table already present
  User.sync({force: true}).then(function () {
    // Table created
    return User.create({
      userId: parseInt(user.userId),
      firstName: user.firstName,
      lastName: user.lastName,
      fileType: user.fileType,
      fileTag: user.fileTag
    });
  });

  res.send(`Success. Saved user: ${user.userId}`);
})

// Receive Phase 2 file
// Example request format:
// {"path":"./file.txt","userId": "123"}
app.post('/api/file', function (req, res) {
  var path = req.body.path;
  var id = parseInt(req.body.userId);

  // Read Phase 2 file
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) throw err;
    // data will contain your file contents
    var meta = parseText(data);

    // retrieve user record from database and update new meta
    User.findOne({where: {userId: id}}).then(function(user) {
      user.update({
        meta1: meta.meta1,
        meta2: meta.meta2
      }).then(function(){
        console.log('update successful');
      })
    })

    // Commented out in development

    // delete file when work is completed
    // fs.unlink(path, function (err) {
    //   if (err) throw err;
    //   console.log('successfully deleted file');
    // });      
  });

})

// helper function to parse meta data out of the file in Phase 2
function parseText (data) {
  var meta = {};
  var firstParse = data.split(',');
  firstParse.forEach(function(item) {
    var subArr = item.split(':');
    meta[subArr[0]] = subArr[1].trim();
  })
  return meta;
}

// Endpoint for clients to request information
// Example request format:
// {"userId": "123"}
app.post('/api/info', function (req, res) {
  console.log(req.body, 'req');
  var id = parseInt(req.body.userId);
  console.log(id, 'iddd')
  User.findOne({where: {userId: id}}).then(function(user) {
   res.send(user.dataValues);
  });
})
