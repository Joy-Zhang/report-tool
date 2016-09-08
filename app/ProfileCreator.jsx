var react = require('react');

module.exports = react.createClass({
    displayName: 'ProfileCreator',
    getDefaultProps: function () {
        return {onChoose: function () {}};
    },
    handleRef: function (ref) {
        this[ref.name] = ref;
    },
    handleClick: function () {
        this.props.onChoose({
            name: this.name.value,
            mail: this.mail.value
        });
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-3"><input name="name" ref={this.handleRef} className="form-control" placeholder="name" /></div>
                <div className="col-xs-6"><input name="mail" ref={this.handleRef} className="form-control" placeholder="mail" /></div>
                <div className="col-xs-3"><button onClick={this.handleClick} className="btn btn-primary btn-block">创建Profile</button></div>
            </div>
        );
    }
});

