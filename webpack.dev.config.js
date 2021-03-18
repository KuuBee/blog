/*
 * @Descripttion: 
 * @Author: KuuBee
 * @Date: 2020-12-13 15:23:32
 * @LastEditors: KuuBee
 * @LastEditTime: 2020-12-14 13:54:33
 */
const {
  merge
} = require('webpack-merge');
const base = require('./webpack.config')
module.exports = merge(base, {
  // devtool: 'source-map',
})
