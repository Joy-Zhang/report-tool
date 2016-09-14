var electron = require('electron');
var remote = electron.remote;

var fs = require('fs');
var path = require('path');

var react = require('react');

var db = require('../model/db.js');

var etpl = require('etpl');
var moment = require('moment');
etpl.addFilter('dateFormat', function (source, format) {
    return moment(parseInt(source)).format(format);
});

var style = {
    row: {
        paddingBottom: '16px'
    }
};

module.exports = react.createClass({
    getDefaultProps: function () {
        return {
            onFinish: function () {}
        }
    },
    getInitialState: function () {
        return {
            profile: remote.getGlobal('settings')['profile'],
            templates: [],
            title: []
        }
    },
    componentWillMount: function () {
        var self = this;
        fs.readdir(path.join(__dirname, '../template'), function (err, files) {
            self.setState({
                templates: files,
            });
            self.analyzeTemplate(files[0]);
        })
    },
    handleRef: function (ref) {
        if(ref !== null) {
            this[ref.name] = ref;
        }
    },
    handleSave: function () {
        var self = this;
        db.Report.create({
            author: this.state.profile.id,
            title: this.state.title.join(''),
            template: this.template.value,
            data: this.data.value
        }).then(function () {
            remote.dialog.showMessageBox({
                type: 'info',
                title: '成功',
                message: '保存成功',
                buttons: []
            });
            self.props.onFinish();

        });
    },
    analyzeTemplate: function (template) {
        var self = this;
        fs.readFile(path.join(__dirname, '../template', template), function (err, data) {
            var match = /<title>(.*?)<\/title>/.exec(data);
            var title = match[1];
            var match = /\$\{data\.(.+?)\}/.exec(title);
            if(match) {

            } else {

                self.setState({title: [etpl.compile(title)({
                    now: (new Date()).getTime().toString()
                })]})
            }
        });
    },
    changeTemplate: function (event) {
        var self = this;
        self.analyzeTemplate(event.target.value);
    },
    render: function () {
        var self = this;

        return (
            <div className="container-fluid">
                <div className="row" style={style.row}>
                    <div className="col-xs-3">模板</div>
                    <div className="col-xs-6">
                        <select className="form-control" name="template" ref={self.handleRef} onChange={self.changeTemplate}>
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
                        {
                            self.state.title.map(function (part) {
                                return part;
                            })
                        }
                    </div>
                </div>
                <div className="row" style={style.row}>
                    <div className="col-xs-3">数据</div>
                    <div className="col-xs-6"><textarea className="form-control" name="data" ref={self.handleRef}></textarea></div>
                </div>
                <div className="row" style={style.row}>
                    <div className="col-xs-2 col-xs-offset-3">
                        <button className="btn btn-primary btn-block" type="button" onClick={self.handleSave}>保存</button>
                    </div>
                    <div className="col-xs-2">
                        <button className="btn btn-default btn-block" type="button" onClick={self.props.onFinish}>取消</button>
                    </div>
                </div>
            </div>
        );
    }
});

