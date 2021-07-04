const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

// Prepare plugins
const plugins = [
  new MiniCssExtractPlugin({
    filename: './style/main.css?v=[contenthash]',
  }),
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
];
// Create more HtmlWebpackPlugin
const files = fs.readdirSync(path.resolve('.', 'src/pages'), 'utf8');
files.forEach((file) => {
  const page = new HtmlWebpackPlugin({
    template: `src/pages/${file}`,
    inject: 'body',
    filename: `pages/${file}`,
    minify: {
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  });
  plugins.push(page);
});

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve('.', 'build'),
    filename: './js/bundle.js?v=[contenthash]',
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
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
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
  plugins,
};
