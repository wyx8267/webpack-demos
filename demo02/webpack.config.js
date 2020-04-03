const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                //正则匹配使用loader转换的文件
                test: /\.css$/,
                //css-loader?minimize:开启css压缩
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};