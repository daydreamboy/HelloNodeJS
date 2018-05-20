var path = require('path');

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
    }
};