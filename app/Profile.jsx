var react = require('react');

var db = require('../model/db.js');

var Link = require('react-router').Link;

var ProfileCard = react.createClass({
    getDefaultProps: function () {
        return {
            onSelect: function () {}
        };
    },
    onClick: function (e) {
        var self = this;
        self.props.onSelect(e, self.props.profile);
    },
    render: function () {
        var self = this;
        return (
            <Link to="/viewer" onClick={self.onClick} className="btn btn-default btn-block" type="button">
                <div>{self.props.profile.id}</div>
                <div>{self.props.profile.mail}</div>
                <div>{self.props.profile.smtp}</div>
            </Link>
        );
    }
});

module.exports = react.createClass({
    getInitialState: function () {
        return {
            profiles: []
        };
    },
    componentWillMount: function () {
        var self = this;
        if(sessionStorage['profile']) {
            console.log(sessionStorage['profile']);
            self.props.router.push('/viewer');
        } else {
            db.Profile.all().then(function (profiles) {
                self.setState({
                    profiles: profiles
                });
            });
        }
    },
    onProfileSelect: function (e, profile) {
        var self = this;
        sessionStorage.setItem('profile', JSON.stringify(profile));
    },
    render: function () {
        var self = this;
        return (
            <div className="container-fluid">
                <div className="row">
                    {
                        self.state.profiles.map(function (item) {
                            return (
                                <div key={item.id} className="col-xs-3">
                                    <ProfileCard profile={item} onSelect={self.onProfileSelect} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
});

