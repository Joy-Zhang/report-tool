var electron = require('electron');
var remote = electron.remote;

var react = require('react');

var Toolbar = require('./Toolbar.jsx');
var ReportEditor = require('./ReportEditor.jsx');
var ReportViewer = require('./ReportViewer.jsx');

module.exports = react.createClass({
    getInitialState: function () {
        return {
            profile: remote.getGlobal('settings')['profile'],
            content: 'viewer'
        }
    },
    componentWillMount: function () {

    },
    handleCreate: function () {
        this.setState({
            content: 'report_editor'
        });
    },
    handleCreateFinish: function () {
        this.setState({
            content: 'viewer'
        });
    },
    render: function () {
        var self = this;
        return (
            <div className="conatiner-fluid" style={{padding: '20px'}}>
                <div className="row">
                    <div className="col-xs-12">
                        <Toolbar onCreate={self.handleCreate} />
                    </div>
                </div>
                <div className="row" style={{margin: '20px'}}>
                    {
                        (function(content) {
                            switch (content) {
                                case 'viewer':
                                    return (<ReportViewer />);
                                case 'report_editor':
                                    return (<ReportEditor onFinish={self.handleCreateFinish}/>);
                                default:
                                    return (<div>无内容组件</div>);
                            }
                        })(this.state.content)
                    }
                </div>
            </div>
        );
    }
});

