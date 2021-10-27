/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2020-12-13 15:23:32
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-27 11:22:24
 */
const { merge } = require("webpack-merge");
const base = require("./webpack.config");
module.exports = merge(base, {
  devtool: "source-map",
  resolve: {
    fallback: {
      "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
    },
  },
});
