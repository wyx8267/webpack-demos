const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 需要构建发布到线上的代码时，执行 webpack --env.production
module.exports = function (env = {}, argv) {
  const plugins = [];
  const isProduction = env['production'];
  if (isProduction) {
    plugins.push(new UglifyJsPlugin());
  }
  return {
    plugins: plugins,
    devtool: isProduction ? undefined : 'source-map'
  };
};