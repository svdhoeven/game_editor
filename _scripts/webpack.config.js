var ExtractTextPlugin = require("extract-text-webpack-plugin");

// var ManifestPlugin = require('webpack-manifest-plugin');
var webpack = require('webpack');
var path = require('path');

//Get path so every environment works
var projectPath = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        editor: projectPath + '/app/js/editor/main.js',
        game: projectPath + '/app/js/game/main.js',
    },
    output: {
        path: projectPath + '/public/bundles',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(projectPath, 'app/js')
                ],
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-es2015-modules-commonjs'].map(function (name) {
                        return require.resolve("babel-plugin-" + name)
                    }),
                    presets: ['es2015'].map(function (name) {
                        return require.resolve("babel-preset-" + name)
                    }),
                    sourceMaps: 'inline'
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: path.join(projectPath, 'app/sass'),
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /node_modules/,
                include: path.join(projectPath, 'public/img'),
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin("final.css")
    ],
    resolve: {
        fallback: [path.join(__dirname, 'node_modules')]
    },
    resolveLoader: {
        fallback: [path.join(__dirname, 'node_modules')]
    }
};