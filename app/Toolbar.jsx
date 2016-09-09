var electron = require('electron');
var remote = electron.remote;

var react = require('react');

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
            <div className="btn-toolbar">
                <div className="btn-group">
                    <button className="btn btn-default">
                        <div><span className="glyphicon glyphicon-plus"></span></div>
                        <div>新建</div>
                    </button>
                </div>
            </div>
        );
    }
});
