const Sequelize = require('sequelize');
const password = require ('./KEYS'); // MySql auth password removed from git repo

var sequelize = new Sequelize('test', 'root', password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

var connect = function () {
  sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    }, function (err) { 
      console.log('Unable to connect to the database:', err);
    });
}

var User = sequelize.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    unique: true
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  },
  fileType: {
    type: Sequelize.STRING
  },
  fileTag: {
    type: Sequelize.STRING
  },
  meta1: {
    type: Sequelize.STRING
  },
  meta2: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = {
  connect: connect,
  User: User
}