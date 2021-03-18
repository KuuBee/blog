/*
 * @Descripttion: 
 * @Author: KuuBee
 * @Date: 2020-12-13 15:23:32
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-18 15:41:28
 */
const {
  merge
} = require('webpack-merge');
const base = require('./webpack.config')
module.exports = merge(base, {
  // devtool: 'source-map',
})
