var electron = require('electron');
var remote = electron.remote;

var react = require('react');
var Link = require('react-router').Link;

module.exports = react.createClass({
    render: function () {
        var self = this;

        return (
            <div className="btn-toolbar">
                <div className="btn-group">
                    <Link className="btn btn-default" to="/editor">
                        <div><i className="fa fa-plus"></i></div>
                        <div>新建</div>
                    </Link>
                </div>
            </div>
        );
    }
});
