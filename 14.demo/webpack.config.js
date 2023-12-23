const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/test-plugin");
const BannerWebpackPlugin = require("./plugins/banner-webpack-plugin");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin");
const AnalyzeWebpackPlugin = require("./plugins/analyze-webpack-plugin");
const InlineChunkWebpackPlugin = require("./plugins/inline-chunk-webpack-plugin")

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
        clean: false
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     // loader: "./loaders/test-loader.js"
            //     // loader: "./loaders/demo/test3.js"
            //     loader: "./loaders/clean-log-loader",
            // },
            // {
            //     test: /\.js$/,
            //     use: [
            //         // "./loaders/demo/test1.js",
            //         // "./loaders/demo/test2.js",
            //         "./loaders/clean-log-loader",
            //         {
            //             loader: "./loaders/banner-loader",
            //             options: {
            //                 author: "流浪"
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.js$/,
            //     loader: "./loaders/babel-loader",
            //     options: {
            //         presets: ["@babel/preset-env"]
            //     }
            // },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "./loaders/file-loader",
                type: "javascript/auto" // 阻止webpack默认处理图片资源，只使用file-loader处理
            },
            {
                test: /\.css$/,
                // loader: "./loaders/style-loader",
                use: ["./loaders/style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        }),
        // new TestPlugin()
        // new BannerWebpackPlugin({
        //     author: "谁不是在流浪"
        // }),
        // new CleanWebpackPlugin(),
        // new AnalyzeWebpackPlugin()
        new InlineChunkWebpackPlugin([/runtime(.*)\.js/])
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}.js`
        }
    },
    mode: "development"
}