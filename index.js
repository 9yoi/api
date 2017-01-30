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
app.post('/api/user', function (req, res) {
  var user = req.body;
  // For development, drop tables if table already present
  User.sync({force: true}).then(function () {
    // Table created
    return User.create({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      fileType: user.fileType,
      fileTag: user.fileTag
    });
  });

  res.send(`Success. Saved user: ${user.userId}`);
})

// Read Phase 2 file
fs.readFile('./file.txt', 'utf8', function (err, data) {
  if (err) throw err;
  // data will contain your file contents
  console.log(data, 'file contents');
  console.log(parseText(data));
  // delete file
  // fs.unlink('./file.txt', function (err) {
  //   if (err) throw err;
  //   console.log('successfully deleted ' + './file.txt');
  // });      
});

function parseText ()
