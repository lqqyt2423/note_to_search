const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: ['es2015', 'react', 'stage-2']
  }
};

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    title: 'react',
    template: './app/index.html',
  }),
  // new webpack.DefinePlugin({
  //   'process.env': {
  //     NODE_ENV: JSON.stringify('production')
  //   }
  // }),
  // new webpack.optimize.UglifyJsPlugin()
];

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: plugins,
  devtool: 'eval',
  devServer: {
    hot: true,
    contentBase: './dist',
    proxy: {
      '/api': 'http://localhost:5555'
    }
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: [
          babelLoader
        ],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
