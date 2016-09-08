var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite://../data/db.sqlite3');


const Profile = sequelize.define('profile', {
  id: {
    type: Sequelize.String
  },
  mail: {
    type: Sequelize.String
  }
});

export {Profile};