# 使用Plugin

> webpack.config.js
```javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            // filename: `[name]_[md5:contenthash:hex:8].css`
            filename: `[name]_[hash:8].css`
        })
    ]
};
``` 
Webpack 是通过`plugins`属性来配置需要使用的插件列表的。`plugins`属性是一个数组，里面的每一项都是插件的一个实例，在实例化一个组件时可以通过构造函数传入这个组件支持的配置属性。

例如`ExtractTextPlugin`插件的作用是提取出 JavaScript 代码里的 CSS 到一个单独的文件。 对此你可以通过插件的`filename`属性，告诉插件输出的 CSS 文件名称是通过`[name]_[hash:8].css`字符串模版生成的，里面的`[name]`代表文件名称，`[hash:8]`代表根据文件内容算出的8位 hash 值。
