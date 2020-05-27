# TypeScript

目前没有任何环境支持运行原生TypeScript代码，必须构建转换成JavaScript代码。

## tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs", // 编译出的代码采用的模块规范
    "target": "es5", // 编译出的代码采用的版本
    "sourceMap": true,
    "importHelpers": true // 减少代码冗余
  },
  "exclude": [ // 不编译的文件
    "node_modules"
  ]
}
```