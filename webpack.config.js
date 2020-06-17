const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, './public'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_nodules/,
            }
        ]
    }
};