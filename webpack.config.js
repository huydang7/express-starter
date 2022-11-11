const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // alias: {
    //   '@src': path.resolve(__dirname, 'src'),
    //   '@src/*': path.resolve(__dirname, 'src/*'),
    //   '@configs': path.resolve(__dirname, 'src/configs'),
    //   '@configs/*': path.resolve(__dirname, 'src/configs/*'),
    //   '@controller': path.resolve(__dirname, 'src/controller'),
    //   '@controller/*': path.resolve(__dirname, 'src/controller/*'),
    //   '@database': path.resolve(__dirname, 'src/database'),
    //   '@database/*': path.resolve(__dirname, 'src/database/*'),
    //   '@exceptions': path.resolve(__dirname, 'src/exceptions'),
    //   '@exceptions/*': path.resolve(__dirname, 'src/exceptions/*'),
    //   '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    //   '@interfaces/*': path.resolve(__dirname, 'src/interfaces/*'),
    //   '@middlewares': path.resolve(__dirname, 'src/middlewares'),
    //   '@middlewares/*': path.resolve(__dirname, 'src/middlewares/*'),
    //   '@models': path.resolve(__dirname, 'src/models'),
    //   '@models/*': path.resolve(__dirname, 'src/models/*'),
    //   '@services': path.resolve(__dirname, 'src/services'),
    //   '@services/*': path.resolve(__dirname, 'src/services/*'),
    //   '@shared': path.resolve(__dirname, 'src/shared'),
    //   '@shared/*': path.resolve(__dirname, 'src/shared/*'),
    // },
    plugins: [new TsconfigPathsPlugin({})],
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
        {
          from: 'files',
          to: 'files',
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
  stats: {
    errorDetails: true,
  },
});
