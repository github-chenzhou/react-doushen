/**
 * @desc 导航列表
 * @author 陈舟
 * @date 2016.2.5
*/

'use strict';

var React = require('react');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Nav = React.createClass({

  propTypes: {
  },

 getInitialState: function() {
    this.el = document.getElementById('J_container');
    return {data: []};
  },

  render: function () {
    return (
      <aside className="nav-left">
      <div className="mui-scroll-wrapper">  
      <ul className="mui-table-view mui-table-view-chevron mui-table-view-inverted">
        <li className="mui-table-view-cell" onClick={this.showMovies}>
          <a className="mui-navigate-right nav-item-title">电影</a>
        </li>
        <li className="mui-table-view-cell" onClick={this.showBooks}>
          <a className="mui-navigate-right nav-item-title">图书</a>
        </li>
        <li className="mui-table-view-cell" onClick={this.showDailiy}>
          <a className="mui-navigate-right nav-item-title">日报</a>
        </li>    
      </ul> 
      </div>
    </aside>
    );
  }

});

module.exports = Nav;