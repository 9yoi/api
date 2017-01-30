const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require ('./db.js');
const User = db.User;
const fs = require ('fs');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// connect mySQL, create database and schema           
db.connect();

// PHASE 1 USER DATA
// Example request format: 
// {"userId":"123", "firstName":"Mei", "lastName": "Png", "fileType": "txt", "fileTag": "mortgage"}
app.post('/api/user/meta', function (req, res) {
  var user = req.body;
  User.sync({force: true}).then(function () {
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

// PHASE 2: FILE
// Example request format:
// {"path":"./file.txt","userId": "123"}

app.post('/api/user/file', function (req, res) {
  var path = req.body.path;
  var id = parseInt(req.body.userId);

  // Read file and parse meta data
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) throw err;
    var meta = parseText(data);
    // retrieve user record from database and update new meta from file
    User.findOne({where: {userId: id}}).then(function(user) {
      user.update({
        meta1: meta.meta1,
        meta2: meta.meta2
      }).then(function(){
        console.log('Phase 2: update of meta successful');
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
// This is based on format of input in file.txt
function parseText (data) {
  var meta = {};
  var firstParse = data.split(',');
  firstParse.forEach(function(item) {
    var subArr = item.split(':');
    meta[subArr[0]] = subArr[1].trim();
  })
  return meta;
}

// DATA ENDPOINT:
// Example request format:
// {"userId": "123"}
app.post('/api/data/user', function (req, res) {
  console.log(req.body, 'req');
  var id = parseInt(req.body.userId);
  console.log(id, 'iddd')
  User.findOne({where: {userId: id}}).then(function(user) {
   res.send(user.dataValues);
  });
})
