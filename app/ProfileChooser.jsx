var react = require('react');
var settings = require('../data/settings.json');

var ProfileButton = require('./ProfileButton.jsx');
var ProfileCreator = require('./ProfileCreator.jsx');
var ipcRenderer = require('electron').ipcRenderer;
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
        if(settings['profile']) {
            ipcRenderer.sendSync('profile', settings['profile']);
        }
        db.Profile.all().then(function (profiles) {
            this.setState({
                profiles: profiles
            });
        });
    },
    componentDidMount: function () {
        ipcRenderer.send('sizing', this.refs.container.offsetHeight);
    },
    componentDidUpdate: function () {
        ipcRenderer.send('sizing', this.refs.container.offsetHeight);
    },
    handleChoose: function (profile) {
        ipcRenderer.send('profile', profile);
    },
    render: function () {
        return (
            <div style={style} className="container-fluid" ref="container">
                <div className="row">
                {
                    this.profiles.map(function(profile, index) {
                        return (
                            <div key={index} className="col-xs-6">
                                <ProfileButton onChoose={this.handleChoose} name={profile.id} mail={profile.mail} />
                            </div>
                        )
                    })
                }
                </div>
                <ProfileCreator onChoose={this.handleChoose} />
            </div>
        );
    }
});

