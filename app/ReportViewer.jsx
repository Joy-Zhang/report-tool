var electron = require('electron');
var remote = electron.remote;

var react = require('react');
var Link = require('react-router').Link;

var db = require('../model/db.js');

var etpl = require('etpl');
var moment = require('moment');
etpl.addFilter('dateFormat', function (source, format) {
    return moment(parseInt(source)).format(format);
});
var path = require('path');

var nodemailer = require('nodemailer');

var ReportMailer = require('./ReportMailer.jsx');

var ReportItemButton = react.createClass({
    getDefaultProps: function () {
        return {
            onSelect: function () {}
        }
    },
    handleClick: function () {
        this.props.onSelect(this.props.report, this.props.index);
    },
    render: function () {
        var self = this;
        return (<button onClick={self.handleClick} className={'list-group-item' + (this.props.active ? ' active' : '')}>{self.props.report.title}</button>);
    }
});

var ReportItemList = react.createClass({
    getInitialState: function () {
        return {
            current: 0,
            offset: 0
        };
    },
    getDefaultProps: function () {
        return {
            pageSize: 6
        };
    },
    onSelect: function (report, index) {
        this.props.onSelect(report);
        this.setState({current: index});
    },
    render: function () {
        var self = this;
        return (
            <div className="list-group">
                {
                    self.props.reports.filter(function (item, index) {
                        return index >= self.state.offset && index < self.props.pageSize + self.state.offset;
                    }).map(function (report, index) {
                        return (<ReportItemButton key={report.id} index={index} active={self.state.current === index} onSelect={self.onSelect} report={report} />);
                    })
                }
            </div>
        );
    }
});

module.exports = react.createClass({
    getInitialState: function () {
        return {
            profile: JSON.parse(sessionStorage['profile']),
            reports: [{id: 0, title: 'Initializing...'}],
            currentReport: {id: 0, title: 'Initializing...', content: '<html><body>Initializing...</body></html>'}
        }
    },
    renderReport: function(report) {
        var render = etpl.loadFromFile(path.join(__dirname, '../template', report.template));
        var html = render({
            data: JSON.parse(report.data),
            author: this.state.profile.id,
            now: (new Date()).getTime().toString()
        });
        return html;
    },
    componentWillMount: function () {
        var self = this;
        db.Report.all({
            where: {
                author: self.state.profile.id
            },
            order: [
                ['timestamp', 'DESC']
            ]
        }).then(function(reports) {
            self.setState({
                reports: reports,
                currentReport: reports[0],
                content: self.renderReport(reports[0])
            });
        });
    },
    componentDidMount: function () {
        var self = this;
        self.refs.preview.onload = function () {
            var height = window.frames['preview'].document.body.parentElement.offsetHeight;
            self.refs.preview.style.height = height + 'px';
        }
    },
    onReportSelect: function (report) {
        var self = this;
        self.setState({
            currentReport: report,
            content: self.renderReport(report)
        });
    },
    onMailSend: function (e) {
        var self = this;
        db.Smtp.findById(self.state.profile.smtp).then(function (smtp) {
            var transporter = nodemailer.createTransport({
                host: smtp.host,
                port: smtp.port,
                auth: {
                    user: self.state.profile.mail_user,
                    pass: self.state.profile.mail_pass
                }
            });
            transporter.sendMail({
                from: '"' + self.state.profile.id + '" <' + self.state.profile.mail + '>',
                to: self.state.profile.mail,
                subject: self.state.currentReport.title,
                html: self.state.currentReport.content
            }, function (err, info) {
                if(err) {
                    remote.dialog.showMessageBox({
                        type: 'error',
                        title: '失败',
                        message: err,
                        buttons: []
                    });
                } else {
                    remote.dialog.showMessageBox({
                        type: 'info',
                        title: '成功',
                        message: info.response,
                        buttons: []
                    });
                }
            });

        });

    },
    render: function () {
        var self = this;

        return (
            <div className="conatiner-fluid">
                <div className="row">
                    <div className="col-xs-3">
                        <ReportItemList active={self.state.currentReport} reports={self.state.reports} onSelect={self.onReportSelect} />
                    </div>
                    <div className="col-xs-9">
                        <div className="panel panel-default">
                            <div className="panel-heading" >
                                <Link className="btn btn-default" to={'/editor/' + self.state.currentReport.id}>
                                    <i className="fa fa-pencil-square-o"></i>
                                </Link>
                                <Link className="btn btn-default" to={'/editor/' + self.state.currentReport.id + '/duplicate'}>
                                    <i className="fa fa-files-o"></i>
                                </Link>
                                <button className="btn btn-default" onClick={self.onMailSend}>
                                    <i className="fa fa-envelope-o"></i>
                                </button>
                            </div>
                            <div className="panel-body" >
                                <iframe ref="preview" name="preview" style={{width: '100%', border: 'none'}} src={'data:text/html;charset=utf-8,' + encodeURIComponent(self.state.content)}></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

