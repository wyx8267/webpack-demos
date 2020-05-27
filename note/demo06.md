# ES6

## babelrc

```json
{
  "plugins": [
    [
      "transform-runtime",
      {
        "polyfill": false
      }
    ]
  ],
  "presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "stage-2",
    "react"
  ]
}
```

### plugins

`babel-plugin-transform-runtime` 该插件使babel正常运行，减少冗余的代码。要在项目中配套使用`babel-runtime`代码才能正常运行。

### presets

该属性告诉babel要转换的源码使用了哪些新的语法特性。

### 接入babel

- 必须依赖的模块：`babel-core` `babel-loader`
- 根据需求选择plugins或presets：`babel-presets-env`

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'source-map'
}
```