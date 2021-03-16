/*
 * @Descripttion: 
 * @Author: 杨湛杰
 * @Date: 2020-12-11 15:00:17
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-16 11:48:46
 */
const path = require("path");
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

// "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
// "builder": "@angular-devkit/build-angular:browser",
// "builder": "@angular-builders/custom-webpack:browser",


// "builder": "@angular-devkit/build-angular:dev-server",
// "builder": "@angular-builders/custom-webpack:dev-server",
// //
// "options": {
//   "customWebpackConfig": {
//     "path": "./custom-webpack.config.js",
//     "replaceDuplicatePlugins": true
//   }
// },
module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.html'],
    alias: {
      // /Users/kuubee/Desktop/self_porject/fontend/ng-blog
      '@src': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src', 'app'),
      "@assets": path.resolve(__dirname, 'src/assets'),
      // '@scss': path.resolve(__dirname, 'src', 'scss'),
    }
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       javascriptEnabled: true,
  //     }
  //   }
  // }
  // module: {
  //   rules: [{
  //     test: /\.scss$/,
  //     use: [{
  //       loader: "sass-loader", // 将 Sass 编译成 CSS
  //       options: {
  //         alias: {
  //           '@assets': path.join(__dirname, 'src/assets')
  //         }
  //       }
  //     }]
  //   }]
  // }
};
