const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV;


module.exports = {
  entry: './public/src/main.js',
  output: {
    //filename: './public/dist/bundle.js'
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: 'public/'
  },
  optimization: {
    // Creates vendor~ and runtime~ chunks.
    // On modify only those chunks that are required are rebuilt, not all.
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,

    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          // https://github.com/webpack/webpack/issues/6567
          inline: false
        }
      })
    ]
  },
  resolve: {
    alias: {
      // For js files using vue.
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    port: 3000
  }
};
