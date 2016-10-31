var electron = require('electron');
var remote = electron.remote;

var react = require('react');
var reactRouter = require('react-router');
var Router = reactRouter.Router;
var Route = reactRouter.Route;
var IndexRoute = reactRouter.IndexRoute;
var history = reactRouter.hashHistory;

var Toolbar = require('./Toolbar.jsx');
var ReportEditor = require('./ReportEditor.jsx');
var ReportViewer = require('./ReportViewer.jsx');

var Frame = react.createClass({
    render: function () {
        var self = this;
        return (
            <div className="conatiner-fluid" style={{padding: '20px'}}>
                <div className="row">
                    <div className="col-xs-12">
                        <Toolbar />
                    </div>
                </div>
                <div className="row" style={{margin: '20px'}}>
                    {self.props.children}
                </div>
            </div>
        );
    }
});

var ReportTool = function () {
    return (
        <Router history={history}>
            <Route path="/" component={Frame}>
                <IndexRoute component={ReportViewer}/>
                <Route path="viewer" component={ReportViewer} />
                <Route path="editor(/:id)" component={ReportEditor} />
                <Route path="editor(/:id/:mode)" component={ReportEditor} />
            </Route>
        </Router>
    );

}


module.exports = ReportTool;
