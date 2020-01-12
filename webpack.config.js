const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = (enviroment, argv) => {
    return {
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        optimization: {
            minimizer: [new UglifyJsPlugin()],

            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }

        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|fi)$/),
            new webpack.DefinePlugin({
                _API_PATH_: JSON.stringify('http://localhost:3000/api'),
                _IMAGES_PATH_: (argv.mode == 'production') ? JSON.stringify('../dist/images/') : JSON.stringify('../dist/images/'),
                _ICON_PATH_: (argv.mode == 'production') ? JSON.stringify('../dist/icons/') : JSON.stringify('../dist/icons/')
            })
        ]
    }
};