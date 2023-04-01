const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: {
        categories: "./js/categories/index.js",
        coaches: "./js/coaches/index.js",
        delegation: "./js/delegation/index.js",
        games: "./js/games/index.js",
        nominations: "./js/nominations/index.js",
        others: "./js/others/index.js",
        regions: "./js/regions/index.js",
        "send-request": "./js/send-request/index.js",
        requests: "./js/requests/index.js",
        users: "./js/users/index.js",
        visa: "./js/visa/index.js"
    },
    output: {
        path: path.resolve(__dirname, "js/dist"),
        filename: "[name]-bundle.js"
    },
    mode: "development",
    plugins: [
        new MinifyPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }
        ]
    }
};