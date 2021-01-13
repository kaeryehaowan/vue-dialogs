
const path = require('path');

module.exports = {
    devtool: 'cheap-source-map',
    entry: path.resolve(__dirname,'src','index.ts'),
    output: {
        filename: 'bundle.js',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            // { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader" }
        ],
        // unknownContextCritical: false,
    },
    resolve: {
        modules: [ "node_modules","src" ],
        extensions: ['.ts', '.js',  '.json']
    },
    // mode: 'development'
    mode: 'production'
};
