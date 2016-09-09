var electron = require('electron');
var remote = electron.remote;

var react = require('react');

var Toolbar = require('./Toolbar.jsx');

module.exports = react.createClass({
    getInitialState: function () {
        return {
            profile: remote.getGlobal('settings')['profile']
        }
    },
    componentWillMount: function () {

    },
    render: function () {
        var self = this;

        return (
            <div className="conatiner-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <Toolbar />
                    </div>
                </div>
            </div>
        );
    }
});

