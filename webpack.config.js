const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, './public'),
    },
    node: {
        fs: "empty"
     },
    devtool: 'source-map',
    module: {
        rules: [

            {
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_nodules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
                ],
            },
        ]
    }
};