const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx', // Your entry point
    output: {
        path: path.resolve(__dirname, 'build'), // Output directory
        filename: 'bundle.js', // Output bundle
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Files to apply this loader to
                exclude: /node_modules/, // Exclude the node_modules directory
                use: {
                    loader: 'babel-loader', // Use babel-loader
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Use presets
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Path to your HTML template
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            https: require.resolve('https-browserify'),
            http: require.resolve('stream-http'),
            zlib: require.resolve('browserify-zlib'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer/'),
            util: require.resolve('util/'),
            net: false, // net는 클라이언트 사이드에서 사용할 수 없으므로 false 처리
            process: require.resolve('process/browser'),
        }, // Resolve these extensions
    },
};
