const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new webpack.DefinePlugin({
                _API_PATH_: JSON.stringify('http://localhost:3000/api'),
                _IMAGES_PATH_: (argv.mode == 'production') ? JSON.stringify('../images/') : JSON.stringify('../dist/images/'),
                _ICON_PATH_: (argv.mode == 'production') ? JSON.stringify('../icons/') : JSON.stringify('../dist/icons/')
            })
        ]
    }
};