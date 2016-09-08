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

    },
    componentWillMount: function () {
        if(settings['profile']) {
            ipcRenderer.sendSync('profile', settings['profile']);
        }
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
        var a = [1,2,3];
        return (
            <div style={style} className="container-fluid" ref="container">
                <div className="row">
                {
                    a.map(function(item, index) {
                        return (
                            <div key={index} className="col-xs-6">
                                <ProfileButton onChoose={this.handleChoose} name="TLZ" mail="twoleft.zhang@outlook.com" />
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

