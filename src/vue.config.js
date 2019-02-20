module.exports = {
    pages: {
        index: {
            entry: 'app/main.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
};