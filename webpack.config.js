const devConfig = require("./webpack.config.dev");
const prodConfig = require("./webpack.config.prod");

module.exports = (_, args) => (args.mode === "production" ? prodConfig : devConfig);
