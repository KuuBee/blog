/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2020-12-13 15:23:22
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-27 11:17:00
 */
const { merge } = require("webpack-merge");
const base = require("./webpack.config");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(base, {
  mode: "production",
  plugins: [
    new CompressionWebpackPlugin({
      algorithm: "gzip",
      deleteOriginalAssets: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "json",
      generateStatsFile: true,
      statsOptions: {
        source: false,
      },
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
            // webpack 真的很难配哎:(
            drop_console: true,
            pure_funcs: ["console.info", "console.debug", "console.warn"],
          },
        },
      }),
    ],
  },
});
