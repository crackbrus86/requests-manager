module.exports = {
    entry: "./js/users/index.js",
    output: {
        filename: "./js/users/users-bundle.js"
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