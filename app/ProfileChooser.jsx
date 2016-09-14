var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;
var remote = electron.remote;

var react = require('react');
var settings = require('../data/settings.json');

var ProfileButton = require('./ProfileButton.jsx');
var ProfileCreator = require('./ProfileCreator.jsx');

var db = require('../model/db.js');


var style = {
    paddingTop: '20px',
    paddingBottom: '20px'
};

module.exports = react.createClass({
    getInitialState: function () {
        return {
            profiles: []
        };
    },
    componentWillMount: function () {
        var self = this;
        if(settings['profile']) {
            ipcRenderer.sendSync('profile', settings['profile']);
        }
        db.Profile.all().then(function (profiles) {
            self.setState({
                profiles: profiles
            });
        });
    },
    componentDidMount: function () {
        remote.getCurrentWindow().setContentSize(640, this.refs.container.offsetHeight);
    },
    componentDidUpdate: function () {
        remote.getCurrentWindow().setContentSize(640, this.refs.container.offsetHeight);
    },
    handleChoose: function (profile) {
        ipcRenderer.send('profile', JSON.parse(JSON.stringify(profile)));
    },
    render: function () {
        var self = this;
        return (
            <div style={style} className="container-fluid" ref="container">
                <div className="row">
                {
                    self.state.profiles.map(function(profile, index) {
                        return (
                            <div key={index} className="col-xs-12">
                                <ProfileButton onChoose={self.handleChoose} profile={profile} />
                            </div>
                        )
                    })
                }
                </div>
                <ProfileCreator onChoose={self.handleChoose} />
            </div>
        );
    }
});

