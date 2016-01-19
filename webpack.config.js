var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        __dirname + '/example/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: './public/build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    // recordsPath: './records.json',
    devtool: 'source-map'
}