const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * @argument {{
 *  entrypoint: string;
 *  output: string;
 *  target: import('webpack').Configuration['target'];
 *  plugins: import('webpack').Configuration['plugins'];
 *  isDev: boolean;
 * }}
 * @returns {import('webpack').Configuration}
 */
const createConfig = ({ entrypoint, output, target, plugins = [], isDev }) => ({
    target,
    devtool: isDev && "source-map",
    mode: isDev ? "development" : "production",
    output: {
        path: path.join(__dirname, "dist"),
        filename: output || "[name].bundle.js",
    },
    entry: {
        [path.parse(entrypoint).name]: entrypoint,
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    devServer: {
        hot: true,
        compress: true,
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
    },
    resolve: {
        alias: {
            src: path.join(__dirname, "src"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(s[ac]ss|css)$/,
                oneOf: [
                    {
                        test: /\.css$/,
                        use: ["style-loader", "css-loader"],
                    },
                    {
                        test: /\.m\.s[ac]ss$/,
                        use: [
                            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        compileType: "module",
                                        mode: "local",
                                        localIdentName: isDev
                                            ? "[local]__[hash:base64:5]"
                                            : "[hash:base64:5]",
                                    },
                                    sourceMap: isDev,
                                },
                            },
                            "sass-loader",
                        ],
                    },
                    {
                        use: ["style-loader", "css-loader", "sass-loader"],
                    },
                ],
            },
            {
                test: /\.(jpg|png|svg|ico|icns)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            },
        ],
    },
    plugins: [isDev === false && new MiniCssExtractPlugin(), ...plugins].filter(Boolean),
});

module.exports = createConfig;
