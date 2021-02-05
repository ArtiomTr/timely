const createConfig = require("./webpack.config.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = createConfig({
    entrypoint: path.join(__dirname, "src", "renderer", "renderer.tsx"),
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
        }),
    ],
    isDev: true,
});
