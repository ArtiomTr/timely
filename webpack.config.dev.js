const path = require("path");
const createConfig = require("./webpack.config.common");

module.exports = [
    createConfig({
        entrypoint: path.join(__dirname, "src", "main", "main.ts"),
        target: "electron-main",
        isDev: true,
    }),
    createConfig({
        entrypoint: path.join(__dirname, "src", "main", "preload.ts"),
        output: "preload.js",
        target: "electron-main",
        isDev: true,
    }),
];
