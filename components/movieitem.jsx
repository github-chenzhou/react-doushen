/**
 * @desc 电影列表项
 * @author 陈舟
 * @date 2016.2.5
*/

'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Movieitem = React.createClass({

  propTypes: {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  },

  statics: {
    getItemHeight: function () {
      return 80;
    }
  },

  handleClick: function(){

  },

  render: function () {
    return (
      <div className="feed_box">
        <header className="feed_header clearfix">
          <span className="fr star"><span className="star50"></span>{this.props.rating.average}</span>
          <dl className="user_info">
          <dd className="user_related">
          <Link className="user_name cont_title" to={`/movie/${this.props.id}`}>{this.props.title}</Link>
  
            <p className="meta color8">
            { this.props.genres.map(function(item, i) {
              return (
                <span onClick={this.handleClick.bind(this, i)} key={i}>{item}</span>
              );
            }, this)}
            </p>

            <p className="meta color8">
              { this.props.actors.map(function(it, i) {
                return (
                  <a href="javascript:;" key={i}>{it}</a>
                );
              }, this)}
            </p>

            </dd></dl></header>

            <section className="feed_cont">
            <div className="feed_pic">
            <ul className="feed_pic_list">
              { this.props.imgs.map(function(src, i) {
                if(i < 4){
                  return (
                    <li key={i}><span className="pic_wrap">
                    <img src={src} className="J_feed_img" data-src="setSytle" />
                    <i className="valign"></i>
                    </span></li>
                  );
                }
          
              }, this)}
            </ul>
            </div>
            </section>

            <footer className="gray_bar flex_equal">
            <a href="javascript:;" className="flex_item">
              <i className="iconfont icon-heart"></i>
              <span className="color8 text_sub">{this.props.collect_count}</span>
            </a>
            <span className="line_gradient"></span>
            <a href="javascript:;" className="flex_item">
              <i className="iconfont icon-star"></i>
              <span className="color8 text_sub">{this.props.rating.stars}</span>
            </a>
            </footer>

            </div>
    );
  },

  getStyle: function () {
    return {
      width: this.props.width,
      height: Item.getItemHeight(),
      backgroundColor: (this.props.itemIndex % 2) ? '#eee' : '#a5d2ee'
    };
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

module.exports = Movieitem;