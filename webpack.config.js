const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const Dotenv = require('dotenv-webpack');

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
    // new NodemonPlugin(),
    new RunScriptWebpackPlugin({
      name: 'main.js',
      nodeArgs: ['--inspect'],
      signal: false | true | 'SIGUSR2',
    }),
  ],
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
});
