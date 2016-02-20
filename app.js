'use strict';

require('./css/mobile/reset.css');
require('./css/mobile/common.css');
require('./css/mobile/index.css');

require('./js/flexible.js');
require('./js/util/vendor.js');

var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;

var Nav = require('./components/canvasside.jsx');
var Movies = require('./page/movies.jsx');
var Movieinfo = require('./page/movieinfo.jsx');
var Books = require('./page/books.jsx');
var Book = require('./page/book.jsx');


var App = React.createClass({

  render: function () {
    return (
      <div id="J_container" className="view">
        <Nav />
        <section id="J_list" className="view">
          {this.props.list}
        </section>
        <div id="J_info" className="view next info">
          {this.props.info}
        </div>
      </div>
    );
  }

});


// router配置

ReactDOM.render(( 
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute components={{list: Movies}} />
      <Route path="movies" components={{list: Movies}} />
      <Route path="movie/:id" components={{list: Movies, info: Movieinfo}}/>
      <Route path="books" components={{list: Books}} />
      <Route path="book/:id" components={{list: Books, info: Book}}/>
      <Route path="*" components={{list: Movies}}/>
    </Route>
  </Router>
  ), document.getElementById('main'));
