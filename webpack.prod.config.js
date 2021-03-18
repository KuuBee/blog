/*
 * @Descripttion: 
 * @Author: KuuBee
 * @Date: 2020-12-13 15:23:22
 * @LastEditors: KuuBee
 * @LastEditTime: 2020-12-29 15:14:03
 */
const {
  merge
} = require('webpack-merge');
const base = require('./webpack.config')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin')


module.exports = merge(base, {
  // plugins: [new MiniCssExtractPlugin()],
  // module: {
  //   rules: [{
  //     test: /\.(scss|sass|css)$/i,
  //     sideEffects: true,
  //     issuer: {
  //       exclude: /\.ts$/
  //     },
  //     use: [{
  //         loader: MiniCssExtractPlugin.loader
  //       },
  //       {
  //         loader: 'css-loader'
  //       },
  //       {
  //         loader: 'sass-loader'
  //       },
  //     ]
  //     // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  //   }, ],
  // },
  plugins: [new CompressionWebpackPlugin({
    algorithm: 'gzip',
    deleteOriginalAssets: true
  })],
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin({
  //     cache: true,
  //     parallel: true
  //   })],
  // },
})
