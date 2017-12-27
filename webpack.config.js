module.exports = {
    entry: "./js/nominations/index.js",
    output: {
        filename: "./js/nominations/nominations-bundle.js"
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