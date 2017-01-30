const express = require('express')
const app = express()
const axios = require('axios');
const db = require ('./db.js');

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// connect mySQL and create database           
db.connect();