var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './assets/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // Add the JSHint loader
        rules:[{
            test: /\.js$/, // Run the loader on all .js files
            exclude: /node_modules/, // Run the loader on all .js files
            use: 'jshint-loader'
        }]
    },
    mode: "development",
    plugins: [
        // FIX: Module build failed: TypeError: Cannot read property 'jshint' of undefined
        // https://github.com/webpack/webpack/issues/6556
        new webpack.LoaderOptionsPlugin({ options: {} })
    ]
};