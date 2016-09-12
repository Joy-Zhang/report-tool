var electron = require('electron');
var remote = electron.remote;

var react = require('react');

module.exports = react.createClass({
    getDefaultProps: function () {
        return {
            onCreate: function () {}
        };
    },
    getInitialState: function () {
        return {
            profile: remote.getGlobal('settings')['profile']
        }
    },
    componentWillMount: function () {

    },
    handleCreate: function () {
        this.props.onCreate();
    },
    render: function () {
        var self = this;

        return (
            <div className="btn-toolbar">
                <div className="btn-group">
                    <button onClick={self.handleCreate} className="btn btn-default">
                        <div><span className="glyphicon glyphicon-plus"></span></div>
                        <div>新建</div>
                    </button>
                </div>
            </div>
        );
    }
});
