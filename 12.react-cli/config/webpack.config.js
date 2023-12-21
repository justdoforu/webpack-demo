const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const getStyleLoaders = (pre) => {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
        "css-loader",
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        'postcss-preset-env'
                    ]
                }
            }
        },
        pre
    ].filter(Boolean)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
        filename: isProduction ? 'static/js/[name].[contenthash:10].js' : 'static/js/[name].js',
        chunkFilename: isProduction ? 'static/js/[name].[contenthash:10].chunk.js' : 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[hash:10][ext][query]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader")
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            // 处理其他资源
            {
                test: /\.(woff2?||ttf)$/,
                type: "asset/resource",
            },
            // js
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: [
                        // "@babel/plugin-transform-runtime",  // presets中包含了
                        !isProduction && "react-refresh/babel",
                    ].filter(Boolean),
                }
            }
        ]
    },
    plugins: [
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache")
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
        }),
        isProduction && new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        ignore: ["**/index.html"]
                    }
                }
            ]
        }),
        !isProduction && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                // 将react相关的库单独打包，减少node_modules的chunk体积。
                react: {
                    name: "chunk-react",
                    test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
                    chunks: "initial",
                    priority: 20,
                },
                // 如果项目中使用antd，此时将所有node_modules打包在一起，那么打包输出文件会比较大。
                // 所以我们将node_modules中比较大的模块单独打包，从而并行加载速度更好
                // 如果项目中没有，请删除
                antd: {
                    name: "chunk-antd",
                    test: /[\\/]node_modules[\\/]antd(.*)/,
                    priority: 30,
                },
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10, // 权重最低，优先考虑前面内容
                    chunks: "initial",
                },
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}.js`
        },
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
            // new ImageMinimizerPlugin({
            //     minimizer: {
            //       implementation: ImageMinimizerPlugin.imageminGenerate,
            //       options: {
            //         plugins: [
            //           ["gifsicle", { interlaced: true }],
            //           ["jpegtran", { progressive: true }],
            //           ["optipng", { optimizationLevel: 5 }],
            //           [
            //             "svgo",
            //             {
            //               plugins: [
            //                 "preset-default",
            //                 "prefixIds",
            //                 {
            //                   name: "sortAttrs",
            //                   params: {
            //                     xmlnsOrder: "alphabetical",
            //                   },
            //                 },
            //               ],
            //             },
            //           ],
            //         ],
            //       },
            //     },
            // })
        ]
    },
    // webpack 解析模块加载选项
    resolve: {
        // 自动补全文件扩展名
        extensions: [
            ".jsx", ".js", "json"
        ]
    },
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    performance: false, // 关闭性能分析，提示速度
}