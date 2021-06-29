const path = require('path');
const { merge } = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve('.', 'build')],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('.', 'src/fonts'),
          to: './fonts',
          noErrorOnMissing: true,
        },
        {
          from: path.resolve('.', 'src/images'),
          to: './images',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
});
