const appPath = `${__dirname}/app`;
const outputPath = `${__dirname}/dist`;

module.exports = {
  lintOnSave: true,
  outputDir: outputPath,
  css: {
    extract: {
      filename: 'css/style.css',
      chunkFilename: 'css/[id].css',
    },
  },
  configureWebpack: {
    resolve: {
      alias: { '@': appPath },
      symlinks: false,
    },
    entry: { app: `${appPath}/main.js` },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: file => (
            /node_modules/.test(file)
            && !/\.vue\.js/.test(file)
          ),
        },
      ],
    },
    output: {
      filename: 'js/script.js',
      chunkFilename: 'js/[id].js',
    },
    plugins: [],
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].hash = true;
      return args;
    });
    config.plugin('copy').tap(([pathConfigs]) => {
      pathConfigs.unshift({
        from: `${appPath}/assets/.htaccess`,
        to: `${outputPath}/.htaccess`,
        toType: 'file',
      });
      return [pathConfigs];
    });
  },
};
