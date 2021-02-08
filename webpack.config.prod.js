const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const createConfig = require("./webpack.config.common");

module.exports = [
    createConfig({
        entrypoint: path.join(__dirname, "src", "renderer", "renderer.tsx"),
        target: "electron-renderer",
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./public/index.html"),
            }),
        ],
        isDev: false,
    }),
    createConfig({
        entrypoint: path.join(__dirname, "src", "main", "preload.ts"),
        target: "electron-main",
        output: "preload.js",
        isDev: false,
    }),
    createConfig({
        entrypoint: path.join(__dirname, "src", "main", "main.ts"),
        target: "electron-main",
        isDev: false,
    }),
];
