const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = (env, {mode}) => {
  console.log({mode})

  const isProduction = mode === 'production'

  const backendUrl = isProduction
    ? 'https://fierce-shelf-74800.herokuapp.com/api/notes'
    : 'http://localhost:3001/api/notes'

  return {
    // entry: './src/index.js',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backendUrl)
      }),
      new HtmlWebpackPlugin({ template: 'src/index.html' })
    ],
    devServer: {
      // contentBase: path.resolve(__dirname, 'build'), default,
      open: true, // para abrir el navegador
      overlay: true,
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic'
                }
              ]
            ]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}