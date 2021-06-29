const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve('.', 'build'),
    filename: './js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.(s?css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-hot-loader',
          'css-loader',
          'sass-loader',
          'import-glob-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|woff|eot|ttf|woff2)$/,
        // use: 'url-loader',
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader', // export HTML as string. HTML is minimized when the compiler demands.
        options: {
          sources: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/photo.html',
      inject: 'body',
      filename: 'pages/photo.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: './style/main.css',
    }),
  ],
};
