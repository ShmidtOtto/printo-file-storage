const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models/index'),
            '@': path.resolve(__dirname, 'src'), 
        }
    },
    mode: 'production',
};