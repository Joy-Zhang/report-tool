var react = require('react');

var style = {
    paddingBottom: '20px'
};

module.exports = react.createClass({
    displayName: 'ProfileButton',
    handleClick: function () {
        this.props.onChoose({
            name: this.props.name,
            mail: this.props.mail
        });
    },
    render: function () {
        return (
            <div style={style}>
                <button onClick={this.handleClick} className="btn btn-default btn-block" type="button">
                    <div>{this.props.name}</div>
                    <div>{this.props.mail}</div>
                </button>
            </div>
        );
    }
});

