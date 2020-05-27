# scss

- 相关依赖：`npm i -D sass-loader css-loader style-loader`
- sass-loader 依赖 node-sass：`npm i -D node-sass`

```javascript
const path = require('path');

module.exports = {
  entry: './index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
        // 处理顺序从后到前
      }
    ]
  }
};
```