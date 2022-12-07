const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },

  module: {
    // rules: [
    //   {
    //     test: /\.m?(js|jsx)$/,
    //     exclude: /(node_modules|bower_components)/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env', '@babel/preset-react']
    //       }
    //     }
    //   }
    // ]
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: [/\.wexbim$/, /\.docx$/, /\.csv$/, /\.mp4$/, /\.xlsx$/, /\.doc$/, /\.avi$/, /\.webm$/, /\.mov$/, /\.mp3$/, /\.pdf$/],
        use: [
          'file-loader',
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.(png|jpg)$/,
        dependency: { not: ['url'] },
        use: [
          'url-loader?limit=200000',
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.(gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: 'assets/[name].[ext]',
              },
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.jsx\.html$/,
        exclude: /node_modules/,
        use: [
          'babel!react-pure-html-component',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
        ],
      },
    ],
  }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.jsx.html'],
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  plugins: [
    new Dotenv()
  ],
}