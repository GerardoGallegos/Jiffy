const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

const env = process.env.NODE_ENV != 'production'
  ? 'development' : 'production'

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      templateParameters: {
        'env': env
      }
    })
  ],

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
})