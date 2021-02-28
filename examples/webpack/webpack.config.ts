import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfig } from 'webpack-dev-server';

const config: Configuration & DevServerConfig = {
  devtool: 'cheap-source-map',
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|bcdice\/lib/,
        use: {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
};
export default config;
