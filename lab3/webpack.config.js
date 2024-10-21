const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: "source-map",
    entry: "./src/app.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: "css-loader",
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
};
