var react = require('react');

module.exports = react.createClass({
    getInitialState: function () {
        return {
            profile: localStorage['profile']
        }
    },
    componentWillMount: function () {
        if(!this.state.profile) {
            var profileChooser = window.open('../window/profileChooser.html', 'new_window', 'modal=true');
            window.addEventListener('message', function (event) {
                localStorage['profile'] = event.data;
            });
        }
    },
    render: function () {

        return react.createElement('div', null, 'Hello Report Tool');
    }
});

