const path = require('path');

module.exports = {
  context: path.join(__dirname, './client'),
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, './client/public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    root: [
      path.resolve('./client/plato')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0'
          ],
          plugins: [
            'react-html-attrs', 
            'transform-class-properties', 
            'transform-decorators-legacy']
        }
      }
    ]
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
