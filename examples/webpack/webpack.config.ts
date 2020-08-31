import { Configuration } from 'webpack';
import { Configuration as DevServer } from 'webpack-dev-server';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration & { devServer?: DevServer } = {
  entry: {
    main: './src',
  },
  output: {
    filename: "[name].js",
    chunkFilename: '[name].js',
    path: resolve('./dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      ".ts",
      ".js",
    ],
  },
  optimization: {
    splitChunks: {
      maxSize: 244_000,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    contentBase: './dist',
  },
};

export default config;
