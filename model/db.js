var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite://../data/db.sqlite3');


var Profile = sequelize.define('profile', {
  id: {
    type: Sequelize.String
  },
  mail: {
    type: Sequelize.String
  }
});

exports.Profile = Profile;