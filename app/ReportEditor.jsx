var electron = require('electron');
var remote = electron.remote;

var fs = require('fs');
var path = require('path');

var react = require('react');

var db = require('../model/db.js');

var style = {
    row: {
        paddingBottom: '16px'
    }
};

module.exports = react.createClass({
    getInitialState: function () {
        return {
            profile: remote.getGlobal('settings')['profile'],
            templates: []
        }
    },

    componentWillMount: function () {
        var self = this;
        fs.readdir(path.join(__dirname, '../template'), function (err, files) {
            self.setState({templates: files});
        })
    },
    handleRef: function (ref) {
        this[ref.name] = ref;
    },
    handleSave: function () {
        db.Report.create({
            author: this.props.profile.name,
            title: this.title.value,
            template: this.template.value,
            data: this.data.value
        }).then(function () {
            remote.dialog.showMessageBox({
                type: 'info',
                title: '成功',
                message: '保存成功',
                buttons: []
            });
        });
    },
    render: function () {
        var self = this;

        return (
            <div className="container-fluid">
                <div className="row" style={style.row}>
                    <div className="col-xs-3">标题</div>
                    <div className="col-xs-6"><input className="form-control" name="title" ref={self.handleRef} /></div>
                </div>
                <div className="row" style={style.row}>
                    <div className="col-xs-3">模板</div>
                    <div className="col-xs-6">
                        <select className="form-control" name="template" ref={self.handleRef}>
                            {
                                this.state.templates.map(function (template) {
                                    return (<option key={template} value={template}>{template}</option>);
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row" style={style.row}>
                    <div className="col-xs-3">数据</div>
                    <div className="col-xs-6"><textarea className="form-control" name="data" ref={self.handleRef}></textarea></div>
                </div>
                <div className="row" style={style.row}>
                    <div className="col-xs-6 col-xs-offset-3">
                        <button className="btn btn-primary" type="button" onClick={self.handleSave}>保存</button>
                    </div>
                </div>
            </div>
        );
    }
});

