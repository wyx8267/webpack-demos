# 使用Loader

> webpack.config.js
```javascript

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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
```
Loader 可以看作具有文件转换功能的翻译员，配置里的`module.rules`数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。 如上配置告诉 Webpack 在遇到以`.css`结尾的文件时先使用`css-loader`读取 CSS 文件，再交给`style-loader`把 CSS 内容注入到 JavaScript 里。 在配置 Loader 时需要注意的是：

- use 属性的值需要是一个由`Loader`名称组成的数组，Loader 的执行顺序是由后到前的；
- 每一个 Loader 都可以通过`URL querystring`的方式传入参数，例如`css-loader?minimize`中的`minimize`告诉`css-loader`要开启 CSS 压缩。

`style-loader`的工作原理大概是把 CSS 内容用 JavaScript 里的字符串存储起来， 在网页执行 JavaScript 时通过 DOM 操作动态地往`HTML head`标签里插入 `HTML style` 标签。