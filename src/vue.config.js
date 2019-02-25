const appPath = `${__dirname}/app`;
const outputPath = `${__dirname}/dist`;

module.exports = {
  lintOnSave: true,
  outputDir: outputPath,
  configureWebpack: {
    entry: { app: `${appPath}/main.js` },
  },
  chainWebpack: config => {
    config.resolve.alias
        .set('assets', `${appPath}/assets`);
  },
};

function htmlPluginArgs(args) {
    args[0].hash = true;
    return args;
}
