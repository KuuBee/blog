/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2020-12-13 15:23:22
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-18 15:44:43
 */
const { merge } = require("webpack-merge");
const base = require("./webpack.config");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  plugins: [
    new CompressionWebpackPlugin({
      algorithm: "gzip",
      deleteOriginalAssets: false,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // FIXME
            // 期望是能去掉 console
            // 但是并没有用。。。并且我也没找到到底是哪里的问题
            drop_console: true,
            pure_funcs: ["console.info", "console.debug", "console.warn"],
          },
        },
      }),
    ],
  },
});
