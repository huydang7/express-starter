const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

module.exports = () => ({
  entry: ['webpack/hot/poll?100', './src/index.ts'],
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    // new RunScriptWebpackPlugin({
    //   name: 'index.js',
    //   nodeArgs: ['--inspect'],
    //   signal: false | true | 'SIGUSR2',
    // }),
    new NodemonPlugin({
      script: './dist/index.js',
      watch: path.resolve('./dist'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: 'public',
        },
      ],
    }),
  ],
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].js',
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
});
