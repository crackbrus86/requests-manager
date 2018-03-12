module.exports = {
    entry: "./js/requests/index.js",
    output: {
        filename: "./js/requests/requests-bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }    
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};