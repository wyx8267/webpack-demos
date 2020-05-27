# 配置

## 配置结构

```javascript
const path = require('path');

module.exports = {
  // entry表示入口，Webpack执行构建的第一步，可抽象成输入
  // 类型：string / object / array
  entry: './app/entry', // 只有一个入口，入口只有一个文件
  entry: ['./app/entry1', './app/entry2'], // 只有一个入口，入口有两个文件
  entry: {
    a: './app/entry-a',
    b: ['./app/entry-b1', './app/entry-b2']
  },// 有两个入口

  output: { // Webpack经过一系列处理后，如何输出最终代码
    path: path.resolve(__dirname, 'dist'), // 输出文件存放的目录，必须是string类型绝对路径

    // 输出文件的名称
    filename: 'bundle.js', // 完整的名称
    filename: '[name].js', // 配置多个entry时，通过名称模板为不同entry生成不同文件
    filename: '[chunkhash].js', // 根据文件内容hash值生成文件名称，用于浏览器长时间缓存文件

    // 发布到线上的所有资源的URL前缀，string类型
    publicPath: '/assets/', // 放到指定目录
    publicPath: '', // 放在根目录
    publicPath: 'https://cdn.example.com', // 放在指定CDN

    // 导出库的名称，string类型
    // 不填时，默认输出格式是匿名的立即执行函数
    library: 'MyLibrary',
    // 导出库的类型，枚举类型，默认为var
    // 可选类型：umd, umd2, commonjs2, commonjs, amd, this, var, assign, window, global, jsonp
    libraryTarget: 'umd',

    // 是否包含有用的文件路径信息到生成的代码里，boolean类型
    pathinfo: true,
    // 附加Chunk的文件名称
    chunkFilename: '[id].js',
    chunkFilename: '[chunkhash].js',
    // JSONP异步加载资源时的回调函数名称，需要和服务端搭配使用
    jsonpFunction: 'myWebpackJsonp',
    // 生成的Source Map文件名称
    sourceMapFilename: '[file].map',
    // 浏览器开发者工具里显示的源码模块名称
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
    // 异步加载跨域的资源时使用的方式
    crossOriginLoading: 'use-credentials',
    crossOriginLoading: 'anonymous',
    crossOriginLoading: 'false'
  },

  // 配置模块相关
  module: {
    rules: [ // 配置Loader
      {
        test: /\.jsx?$/, // 正则匹配命中要使用的Loader的文件
        include: [ // 只命中该范围内的文件
          path.resolve(__dirname, 'app')
        ],
        exclude: [ // 忽略该范围内的文件
          path.resolve(__dirname, 'app/demo-files')
        ],
        use: [ // 使用哪些Loader，有先后次序，从后往前执行
          'style-loader', // 直接使用Loader的名称
          {
            loader: 'css-loader',
            options: {// 向该Loader传一些参数
            }
          }
        ]
      }
    ],

    noParse: [ // 不需要解析和处理的模块
      /special-library\.js$/ // 用正则匹配
    ]
  },

  // 配置插件
  plugins: [],

  // 配置寻找模块的规则
  resolve: {
    modules: [ // 寻找模块的根目录，为array类型，默认为node_modules为根目录
      'node_modules',
      path.resolve(__dirname, 'app')
    ],
    extensions: ['.js', '.json', '.jsx', '.css'], // 模块的后缀名
    alias: { // 模块别名配置，用于映射模块
      // 将'module'映射成'new-module',同样，'module/path/file' 也会被映射成 'new-module/path/file'
      'module': 'new-module',
      // 将'only-module'映射成'new-module',但'only-module/path/file' 不会被映射成 'new-module/path/file'
      'only-module$': 'new-module',
    },
    alias: [ // 支持使用数组进行更详细的配置
      {
        name: 'module',
        alias: 'new-module',
        onlyModule: true // 是否只映射模块，true：只有'module'被映射，false：'module/path/file'也会被映射
      }
    ],
    symlinks: true, // 是否跟随文件的软链接搜寻模块路径
    descriptionFiles: ['package.json'], // 模块的描述文件
    mainFields: ['main'], // 模块的描述文件里描述入口的文件的字段名
    enforceExtension: false // 是否强制导入语句写明文件后缀
  },

  // 输出文件的性能检测配置
  performance: {
    hints: 'warning', // 有性能问题时输出警告
    hints: 'error', // 有性能问题时输出错误
    hints: false, // 关闭性能检查
    maxAssetSize: 200000, // 最大文件的大小（单位bytes）
    maxEntrypointSize: 400000, // 最大入口文件的大小（单位bytes）
    assetFilter: function (assetFilename) { // 过滤要检查的文件
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: 'source-map', // 配置source-map类型
  context: __dirname, // Webpack使用的根目录， string类型必须是绝对路径
  // 配置输出代码的运行环境
  target: 'web', // 浏览器，默认
  target: 'webworker',
  target: 'node', // node.js 使用require语句加载Chunk代码
  target: 'async-node', // node.js 异步加载Chunk代码
  target: 'node-webkit',
  target: 'electron-main', // electron 主线程
  target: 'electron-renderer', // electron 渲染线程

  externals: { // 使用来自JavaScript运行环境提供的全局变量
    jquery: 'jQuery'
  },
  stats: { // 控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },

  // DevServer相关的配置
  devServer: {
    proxy: { // 代理到后端服务接口
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // 配置DevServer HTTP服务器的文件根目录
    compress: true, // 是否开启Gzip压缩
    historyApiFallback: true, // 是否开发 HTML5 History API 网页
    hot: true, // 是否开启模块热替换功能
    https: false, // 是否开启HTTPS模式
  },

  profile: true, // 是否捕捉Webpack构建的性能信息，用于分析时什么原因导致构建性能不佳
  cache: false, // 是否启用缓存来提升构建速度
  watch: true, // 是否打开监听模式
  watchOptions: { // 监听模式选项
    ignored: /node_modules/, // 不监听的文件或文件夹，支持正则匹配， 默认空
    aggregateTimeout: 300, // 监听到变化后等300ms再执行，防止文件更新太快导致重新编译频繁
    poll: 1000 // 不停询问系统指定的文件有没有发生变化，默认每秒1000次
  }
};
```

## 配置类型