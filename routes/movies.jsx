/**
 * @desc 电影列表
 * @author 陈舟
 * @date 2016.2.5
*/

'use strict';

module.exports = {
  path: 'movies',
  getComponent(location, cb) {
    require.ensure([], function(require){
      cb(null, require('../page/movies.jsx'))
    })
  }
}