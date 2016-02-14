/**
 * @desc 电影列表
 * @author 陈舟
 * @date 2016.2.5
*/

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var MovieHeader = require('../components/header.jsx');
var Bookitem = require('../components/bookitem.jsx');

var Books = React.createClass({
  propTypes: {
    // width: React.PropTypes.number.isRequired
  },

  getBooks: function(pageNo) {
    var _this = this;
    var start = pageNo * 10;

    this.pageNo = pageNo;

    $.ajax({
      url: 'https://api.douban.com/v2/book/search',
      dataType: 'jsonp',
      type: 'get',
      jsonp: 'callback',
      data: {'q': '', 'tag': '经典', 'start': start, 'count': 10, apikey:'0c9ca568e0e58e2025d5f03aa2b0aa60' }, 
      cache: false,
      success: function(json) {
         if (json) {
            var data = json.books;

            _.each(data, function(item){
              var img = new Image();
              img.src = item.images["large"];
            });

          this.renderItem(this.data.concat(data));        
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url||'', status, err);
      }.bind(this)
    });
  },
  

  getInitialState: function() {
    this.data = [];
    this.getBooks(0);
    return {data: [], column1: [], column2: []};
  },

  componentDidMount: function() {
    this.el = document.getElementById('J_books');
  },

  componentWillUnmount: function() {
    this.el.removeEventListener('touchmove', this.handleScroll);
  },

  handleScroll: function(evt) {
    var el = this.el;

    if (el.scrollHeight - el.clientHeight - el.scrollTop < 500) {
      this.pageNo = this.pageNo + 1;
      this.getBooks(this.pageNo);
    }
  },

  renderItem: function(data) {
    var uls = $('#J_books ul');

    for(var i=0, len=data.length; i<len; i++){
      var item = data[i];
    
      uls.sort(function (ul1, ul2) {
        return ul1.offsetHeight - ul2.offsetHeight;
      });

     uls.first().append(React.renderToString(<Bookitem 
          id={item.id} 
          title={item.title} 
          images={item.images} key={i}>
        </Bookitem>));

      /*
      ReactDOM.render(<Bookitem 
          id={item.id} 
          title={item.title} 
          images={item.images} key={i}>
        </Bookitem>, uls.first().get(0));
      */
    }
  },

  render: function () {
    /*
    var items = this.state.data.map(function (item, i) {
      return (
        <Bookitem 
          id={item.id} 
          title={item.title} 
          images={item.images} key={i}>
        </Bookitem>
      );
    });
    */
    
    return (
      <div>
      <MovieHeader title="图书" />
      <section id='J_books' className="list" onTouchMove={this.handleScroll}>
        <ul id='J_books_left' className="books books-left "></ul>
        <ul id='J_books_right' className="books books-right "></ul>
      </section>
      </div>
    );
  },

  getTitleStyle: function () {
    return {
      top: 32,
      left: 80,
      width: this.props.width - 90,
      height: 18,
      fontSize: 14,
      lineHeight: 18
    };
  }

});

module.exports = Books;