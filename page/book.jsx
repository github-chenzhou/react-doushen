/**
 * @desc 图书详情
 * @author 陈舟
 * @date 2016.2.5
*/

'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Book = React.createClass({
  propTypes: {
    // width: React.PropTypes.number.isRequired
    // height: React.PropTypes.number.isRequired,
    // imageUrl: React.PropTypes.string.isRequired,
    // title: React.PropTypes.string.isRequired
  },

  loadMovieInfo: function(id) {
    var _this = this;
    // TODO: 显示电影详情
    this.el.classList.add('info-into');

    $.ajax({
      url: 'https://api.douban.com/v2/book/'+id,
      dataType: 'jsonp',
      type: 'get',
      jsonp: 'callback',
      data: {apikey:'0c9ca568e0e58e2025d5f03aa2b0aa60'}, 
      cache: false,
      success: function(json) {
         if (json) {
          var data = json;

          // this.formatData(data);
          this.setState({data: data});   
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('', status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    this.el = document.getElementById('J_container');
    return {data: {images: { large: ''}}};
  },

  componentDidMount: function() {
    var id = this.props.params.id;
    this.loadMovieInfo(id);
  },

  componentWillUnmount: function() {
    this.el.removeEventListener('touchmove', this.handleScroll);
  },

  componentWillReceiveProps(nextProps) {
    var id = nextProps.params.id;
    this.loadMovieInfo(id);
  },

  // EVEVNT

  handleScroll: function(evt) {
    var el = this.el;
  },

  // 返回电影列表
  back: function(){
     this.el.classList.remove('info-into');
  },

  render: function () {
    return (
      <section>
      <nav className="top_navgination clearfix">
        <a href="javascript:;" className="fl back J_movie_back" onClick={this.back}><i className="arror_left"></i></a>
        <h1 className="top_title txt_cut">图书介绍</h1>
      </nav>
      <div className="info-banner"><img width="100%" src={this.state.data.images["large"]} className="" /></div>
      <div className="artical_cont mb60">
        <header className="info_title information_title clearfix">
          <h2><a href={this.state.data.mobile_url}>{this.state.data.title}</a></h2>
        </header>
        <article className="info_detail">{this.state.data.summary}</article>
        <article class="info_detail">{this.state.data.catalog}</article>
        <article class="info_detail">{this.state.data.author_intro}</article>
      </div>
      </section>
    );
  },

  getStyle: function () {
    return {
      width: '100%'
    };
  }

});

module.exports = Book;