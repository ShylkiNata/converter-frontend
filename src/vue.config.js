const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = `${__dirname}/app`;

module.exports = {
  lintOnSave: true,
  outputDir: 'public',
  css: { extract: {
    filename: 'css/style.css',
    chunkFilename: 'css/[id].css',
  } },
  configureWebpack: {
    entry: { app: `${appPath}/main.js` },
    resolve: {
      alias: { 
        '@': appPath,
        'assets': `${appPath}/assets`
      },
      symlinks: false,
    },
    module: { rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file)
                        && !/\.vue\.js/.test(file)
        ),
      },
    ] },
    output: {
      filename: 'js/script.js',
      chunkFilename: 'js/[id].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'app/assets/index.html',
        hash: true,
      }),
    ],
  },
};
