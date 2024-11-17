const path = require('path');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
    mode: 'development',
    entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, 'client/build'),
        filename: 'static/js/main.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
};

const serverConfig = {
    mode: 'development',
    entry: './api/src/server.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'api/build'),
        filename: 'server.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
};

module.exports = [clientConfig, serverConfig];