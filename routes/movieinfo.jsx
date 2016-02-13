/**
 * @desc 电影列表
 * @author 陈舟
 * @date 2016.2.5
*/

'use strict';

module.exports = {
  path: 'movie/:id',

  getComponent(location, cb) {
    require.ensure([], function(require){
      cb(null, require('../page/movieinfo.jsx'))
    })
  }
}
