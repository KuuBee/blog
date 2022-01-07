/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2020-12-11 15:00:17
 * @LastEditors: KuuBee
 * @LastEditTime: 2022-01-07 14:48:21
 */
const path = require("path");
module.exports = {
  resolve: {
    extensions: [".ts", ".js", ".scss", ".html"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@app": path.resolve(__dirname, "src", "app"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  module:{
    rules:[
      {
        test: /\.svg/,
        type: 'asset/source'
      }
    ]
  }
};
