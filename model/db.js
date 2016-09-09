var Sequelize = require('sequelize');
var url = require('url');
var path = require('path');

var sequelize = new Sequelize('db', null, null, {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../data/db.sqlite3')
});


var Profile = sequelize.define('profile', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    mail: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    tableName: 'profile'
});

exports.Profile = Profile;