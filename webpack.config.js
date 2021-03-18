/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2020-12-11 15:00:17
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-18 15:24:29
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
};
