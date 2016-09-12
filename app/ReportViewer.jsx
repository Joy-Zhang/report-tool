var electron = require('electron');
var remote = electron.remote;

var react = require('react');

var db = require('../model/db.js');

var etpl = require('etpl');
var path = require('path');



var ReportItemButton = react.createClass({
    getDefaultProps: function () {
        return {
            onSelect: function () {}
        }
    },
    handleClick: function () {
        this.props.onSelect(this.props.report);
    },
    render: function () {
        var self = this;
        return (<button onClick={self.handleClick} className={'list-group-item' + (this.props.active ? ' active' : '')}>{self.props.report.title}</button>);
    }
});

module.exports = react.createClass({
    getInitialState: function () {
        return {
            profile: remote.getGlobal('settings')['profile'],
            reports: [{id: 0, title: 'Initializing...'}],
            currentReport: 0,
            content: '<html><body>Initializing...</body></html>'
        }
    },
    renderReport: function(report) {
        var render = etpl.loadFromFile(path.join(__dirname, '../template', report.template));
        var html = render({
            data: report.data,
            author: this.state.profile.name
        });
        return html;
    },
    componentWillMount: function () {
        var self = this;
        db.Report.all({
            order: [
                ['timestamp', 'DESC']
            ]
        }).then(function(reports) {
            self.setState({
                reports: reports,
                currentReport: reports[0].id,
                content: self.renderReport(reports[0])
            });
        });
    },
    handleSelect: function (report) {
        var self = this;
        self.setState({
            currentReport: report.id,
            content: self.renderReport(report)
        });
    },
    render: function () {
        var self = this;

        return (
            <div className="conatiner-fluid">
                <div className="row">
                    <div className="col-xs-3">
                        <div className="list-group">
                            {
                                self.state.reports.map(function (report) {
                                    return (<ReportItemButton key={report.id} active={self.state.currentReport === report.id} onSelect={self.handleSelect} report={report} />);
                                })
                            }
                        </div>
                    </div>
                    <div className="col-xs-9">
                        <div className="panel panel-default">
                            <div className="panel-body" dangerouslySetInnerHTML={{__html: '<webview autosize="on" src="data:text/html;charset=utf-8,' + encodeURIComponent(self.state.content) + '"></webview>'}}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

