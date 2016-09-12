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

var Report = sequelize.define('profile', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: Sequelize.TEXT
    },
    title: {
        type: Sequelize.TEXT
    },
    template: {
        type: Sequelize.TEXT
    },
    data: {
        type: Sequelize.TEXT
    },
    timestamp: {
        type: Sequelize.INTEGER,
        defaultValue: (new Date()).getTime()
    }
}, {
    timestamps: false,
    tableName: 'report'
});

exports.Profile = Profile;
exports.Report = Report;