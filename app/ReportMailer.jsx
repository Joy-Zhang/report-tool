var electron = require('electron');
var remote = electron.remote;

var react = require('react');

module.exports = react.createClass({
    getDefaultProps: function () {
        return {
            onSend: function () {}
        };
    },
    handleRef: function (ref) {
        this[ref.name] = ref;
    },
    handleClick: function () {
        this.props.onSend({
            to: this.to.value,
            cc: this.cc.value
        });
    },
    render: function () {
        var self = this;

        return (
            <div className="form-inline">
                <div className="form-group">
                    <input ref={self.handleRef} className="form-control" name="to" placeholder="收件人" />
                </div>
                <div className="form-group">
                    <input ref={self.handleRef} className="form-control" name="cc" placeholder="抄送" />
                </div>
                <button onClick={self.handleClick} className="btn btn-default">发送</button>
            </div>
        );
    }
});
