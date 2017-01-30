const Sequelize = require('sequelize');
const password = require ('./KEYS'); // MySql auth password removed from git repo
console.log(password, 'pass')
var sequelize = new Sequelize('nova', 'root', password, {
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
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

  User.sync({force: true}).then(function () {
    // Table created
    return User.create({
      userId: 123,
      firstName: 'John',
      lastName: 'Hancock',
      fileType: 'txt',
      fileTag: 'mortageß'
    });
  });
  
}

module.exports = {
  connect: connect
}