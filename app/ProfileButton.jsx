var react = require('react');

var style = {
    paddingBottom: '20px'
};

module.exports = react.createClass({
    displayName: 'ProfileButton',
    handleClick: function () {
        this.props.onChoose(this.props.profile);
    },
    render: function () {
        return (
            <div style={style}>
                <button onClick={this.handleClick} className="btn btn-default btn-block" type="button">
                    <div>{this.props.profile.id}</div>
                    <div>{this.props.profile.mail}</div>
                </button>
            </div>
        );
    }
});

