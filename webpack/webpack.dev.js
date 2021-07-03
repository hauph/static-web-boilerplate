const path = require('path');
const { merge } = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve('.', 'src'), // source of static assets
    port: 1802, // port to run dev-server
    hot: true, // hot reload
    watchContentBase: true,
    // open: true, // immediately open browser to show localhost:1802 when start script
  },
  plugins: [
    new ESLintPlugin({}),
    new StylelintPlugin({ fix: true }),
    new WebpackNotifierPlugin({ onlyOnError: true }),
  ],
});
