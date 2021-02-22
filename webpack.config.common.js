const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * @param { 'development' | 'production' } mode
 */
const getConfig = (mode) => ({
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: [/node_modules/, /dist/, /lib/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: mode === 'development',
            },
          },
        ],
      },
      {
        test: /\.module.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
              camelCase: true,
              namedExport: true,
              watch: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: '[name].[hash]',
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  mode,
  entry: {
    app: ['core-js/stable', 'regenerator-runtime/runtime', `./src/index.tsx`],
  },
  output: {
    globalObject: 'self',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'integra-ui',
      template: path.join(__dirname, 'src/index.html'),
    }),
  ],
  devServer: {
    compress: true,
    port: 8080,
    historyApiFallback: true,
    contentBase: [path.resolve(__dirname), path.resolve(__dirname, 'dist')],
  },
});

module.exports = getConfig;
