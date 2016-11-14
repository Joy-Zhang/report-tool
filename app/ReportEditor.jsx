var electron = require('electron');
var remote = electron.remote;

var fs = require('fs');
var path = require('path');

var react = require('react');
var Link = require('react-router').Link;

var db = require('../model/db.js');

var etpl = require('etpl');
var moment = require('moment');
var domino = require('domino');

etpl.addFilter('dateFormat', function (source, format) {
    return moment(parseInt(source)).format(format);
});

var style = {
    row: {
        paddingBottom: '16px'
    }
};

module.exports = react.createClass({
    id: 0,
    mode: 'edit',
    profile: null,
    initializeTemplates: function() {
        var self = this;
        return new Promise(function(resolve, reject) {
            fs.readdir(path.join(__dirname, '../template'), function (err, files) {
                self.setState({
                    templates: files,
                });
                resolve(files);
            });
        });
    },
    getInitialState: function () {
        return {
            templates: [],
            template: '',
            title: '',
            data: ''
        };
    },
    componentWillMount: function () {
        var self = this;
        self.profile = JSON.parse(sessionStorage['profile']);
        if(self.props.params.mode) {
            self.mode = self.props.params.mode;
        }

        self.id = parseInt(self.props.params.id);

        self.initializeTemplates().then(function (files) {
            if(!Number.isNaN(self.id)) {
                db.Report.findById(self.id).then(function (report) {
                    if(report) {
                        if(self.mode === 'duplicate') {
                            self.setState({
                                data: report.data
                            });
                            self.analyzeTemplate(report.template);
                        } else {
                            self.setState({
                                data: report.data,
                                template: report.template,
                                title: report.title
                            });
                        }
                    } else {
                        self.analyzeTemplate(files[0]);
                    }
                });
            } else {
                self.analyzeTemplate(files[0]);
            }
        });
    },
    onSave: function (e) {
        var self = this;
        if(self.mode === 'duplicate' || Number.isNaN(self.id)) {
            db.Report.create({
                author: self.profile.id,
                title: self.state.title,
                template: self.state.template,
                data: self.state.data
            }).then(function () {
                remote.dialog.showMessageBox({
                    type: 'info',
                    title: '成功',
                    message: '保存成功',
                    buttons: []
                });
            });
        } else {
            db.Report.update({
                author: self.profile.id,
                title: self.state.title,
                template: self.state.template,
                data: self.state.data
            }, {
                where: {
                    id: self.id
                }
            }).then(function () {
                remote.dialog.showMessageBox({
                    type: 'info',
                    title: '成功',
                    message: '保存成功',
                    buttons: []
                });
            });
        }
    },
    analyzeTemplate: function (template) {
        var self = this;
        fs.readFile(path.join(__dirname, '../template', template), function (err, data) {
            var tplWindow = domino.createWindow(data);

            var titleTpl = tplWindow.document.querySelector('title').innerHTML;
            var title = etpl.compile(titleTpl)({
                now: (new Date()).getTime().toString()
            });
            self.setState({title: title, template: template});
        });
    },
    onTemplateChange: function (event) {
        var self = this;
        self.analyzeTemplate(event.target.value);
    },
    onChange: function (e) {
        var self = this;
        var state = {};
        state[e.target.name] = e.target.value;
        self.setState(state);
    },
    render: function () {
        var self = this;

        return (
            <div className="container-fluid">
                <div className="row" style={style.row}>
                    <div className="col-xs-3">模板</div>
                    <div className="col-xs-6">
                        <select className="form-control" name="template" value={self.state.template} onChange={self.onTemplateChange}>
                            {
                                this.state.templates.map(function (template) {
                                    return (<option key={template} value={template}>{template}</option>);
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row" style={style.row}>
                    <div className="col-xs-3">标题</div>
                    <div className="col-xs-6">
                        <input className="form-control" name="title" value={self.state.title} onChange={self.onChange} />
                    </div>
                </div>
                <div className="row" style={style.row}>
                    <div className="col-xs-3">数据</div>
                    <div className="col-xs-6">
                        <textarea className="form-control" rows="20" name="data" value={self.state.data} onChange={self.onChange}></textarea>
                    </div>
                    <div className="col-xs-3">
                        <pre style={{maxHeight: '420px'}}>
                            {
                                (function () {
                                    try {
                                        return JSON.stringify(JSON.parse(self.state.data), undefined, 2);
                                    } catch (e) {
                                        return e.message;
                                    }
                                })()
                            }
                        </pre>
                    </div>
                </div>
                <div className="row" style={style.row}>
                    <div className="col-xs-2 col-xs-offset-3">
                        <Link to="/viewer" className="btn btn-primary btn-block" type="button" onClick={self.onSave}>保存</Link>
                    </div>
                    <div className="col-xs-2">
                        <Link to="/viewer" className="btn btn-default btn-block" type="button">取消</Link>
                    </div>
                </div>
            </div>
        );
    }
});

