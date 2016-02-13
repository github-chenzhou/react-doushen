/**
 * @desc 电影列表
 * @author 陈舟
 * @date 2016.2.5
*/

'use strict';

var React = require('react');
var Link = require('react-router').Link;
// var MovieHeader = require('./components/.jsx');

var MovieInfo = React.createClass({
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
      url: 'https://api.douban.com/v2/movie/subject/'+id,
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
   
  formatData: function (data) {
    var _this = this;
    
    _.each(data, function ( obj, index ) {
      // 图片列表 人员列表：导演 主演
      var imgs = [];
      var actors = [];

      // 剧照
      obj.images && obj.images['large'] && imgs.push(obj.images['large']);
      // 导演 
      if( obj.directors && obj.directors.length > 0 ){
        _.each( obj.directors, function ( director, index ) {
          director.name && actors.push( director.name );
          director.avatars && imgs.push( director.avatars[ 'large' ] );
        });
      }

      if( obj.casts && obj.casts.length > 0 ) {
        _.each( obj.casts, function ( cast, index ) {
          cast.name && actors.push( cast.name );
          cast.avatars && imgs.push( cast.avatars[ 'large' ]);
        });
      }

      obj.actors = actors;
      obj.imgs = imgs;
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
    // mui-table-view mui-table-view-chevron onTouchMove={this.handleScroll}
    // <span className="fr star"><span class="star50"></span>{this.props.rating.average}</span>
    // poster={this.state.data.images.large}

    return (
      <section>
      <nav className="top_navgination clearfix">
        <a href="javascript:;" className="fl back J_movie_back" onClick={this.back}><i className="arror_left"></i></a>
        <h1 className="top_title txt_cut">电影介绍</h1>
      </nav>
      <div className="info-banner"><img width="100%" src={this.state.data.images.large} className="" /></div>
      <div className="artical_cont mb60">
        <header className="info_title information_title clearfix">
          <h2><a href={this.state.data.mobile_url}>{this.state.data.title}</a></h2>
        </header>
        <article className="info_detail">{this.state.data.summary}</article>
         <video id="J_video" width="100%" src="http://vt3.douban.com/201602131838/3de37daa4b249e3fb9d5a499ff522337/view/movie/M/301080756.mp4" controls="controls" autoplay="autoplay"></video>
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

module.exports = MovieInfo;