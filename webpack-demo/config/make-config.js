'use strict';

let path = require('path');
let glob = require('glob');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let srcDir = path.resolve(process.cwd(), 'src');
let nodeModPath = path.resolve(__dirname, './node_modules');
let dist = 'dist/';
let hashLen = "10";
let pathMap = require('../src/pathmap.json');
let entries = (() => {
  let jsDir = path.resolve(srcDir, 'scripts');
  let entryFiles = glob.sync(jsDir + '/*.{js,jsx}');
  let map = {};
  entryFiles.forEach(function(filePath) {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    map[filename] = filePath;
  });
  return map;
}());
let chunks = Object.keys(entries);

module.exports = (options) => {
  options = options || {};
  let debug = options.debug !== undefined ? options.debug : true;
  let publicPath = '';
  let cssLoader;
  let scssLoader;
  let plugins = () => {
    let entryHtml = glob.sync(srcDir + '/*.html');
    let r = [];
    entryHtml.forEach(function(filePath) {
      let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
      let conf = {
        template: filePath,
        filename: filename + '.html'
      };
      if (filename in entries) {
        conf.inject = 'body';
        conf.chunks = ['vender', 'common', filename];
      }
      r.push(new HtmlWebpackPlugin(conf));
    });
    r.push(new CommonsChunkPlugin({
      name: 'common',
      chunks: chunks
    }));
    r.push(new CommonsChunkPlugin({
      name: 'vender',
      chunks: ['common']
    }));
    return r;
  }();
  if (debug) {
    cssLoader = 'style!css?sourceMap!postcss';
    scssLoader = 'style!css?sourceMap!postcss!sass';
    plugins.push(new webpack.NoErrorsPlugin());
  } else {
    cssLoader = ExtractTextPlugin.extract('style', 'css?minimize!postcss');
    scssLoader = ExtractTextPlugin.extract('style', 'css?minimize!postcss!sass');
    plugins.push(new ExtractTextPlugin('styles/[contenthash:' + hashLen + '].[name].min.css', { allChunks: false }));
    plugins.push(new UglifyJsPlugin());
  }
  let config = {
    entry: Object.assign(entries, { 'vender': ['zepto'] }),
    output: {
      path: path.resolve(dist),
      filename: debug ? '[name].js' : 'scripts/[chunkhash:' + hashLen + '].[name].min.js',
      chunkFilename: debug ? '[chunkhash:' + hashLen + '].chunk.js' : 'scripts/[chunkhash:' + hashLen + '].chunk.min.js',
      hotUpdateChunkFilename: debug ? '[id].js' : 'scripts/[chunkhash:' + hashLen + '].[id].min.js',
      publicPath: publicPath
    },
    resolve: {
      root: [srcDir, './node_modules'],
      extensions: ['', '.js', '.jsx', '.es6', '.css', '.scss', '.tpl', '.ejs', '.png', '.jpg', '.jpeg', '.svg'],
      alias: pathMap
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: cssLoader
      }, {
        test: /\.scss$/,
        loader: scssLoader
      }, {
        test: /\.(jpe?g|png|svg|woff)$/i,
        loader: 'url?limit=10000&name=images/[hash:' + hashLen + '].[name].[ext]'
      }, {
        test: /\.(woff2|eot|ttf|gif)$/i,
        loader: 'file?name=fonts/[hash:' + hashLen + '].[name].[ext]'
      }, {
        test: /\.(tpl|ejs)$/,
        loader: 'ejs'
      }, {
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
      }]
    },
    plugins: plugins,
    postcss: () => [
      require('postcss-cssnext'),
      require('autoprefixer')({ browsers: ['last 2 versions', '> 1%'] }),
      require('cssnano')
    ],
    devServer: {
      hot: true,
      noInfo: false,
      inline: true,
      publicPath: publicPath,
      stats: {
        cached: false,
        colors: true
      }
    }
  };
  return config;
}