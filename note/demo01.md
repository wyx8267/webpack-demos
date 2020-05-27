# Entry

> webpack.config.js
```javascript

const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    }
};
```

构建第一步从`entry`开始，指定入口文件。使用`output`指定输出文件名称及输出文件夹。