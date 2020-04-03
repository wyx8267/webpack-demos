# webpack-dev-server

DevServer 启动后会一直驻留在后台保持运行，访问这个网址你就能获取项目根目录下的 index.html。 用浏览器打开这个地址你会发现页面空白错误原因是`./dist/bundle.js`加载404了。 同时你会发现并没有文件输出到 dist 目录，原因是 DevServer 会把 Webpack 构建出的文件保存在内存中，在要访问输出的文件时，必须通过 HTTP 服务访问。 由于 DevServer 不会理会 webpack.config.js 里配置的 output.path 属性，所以要获取 bundle.js 的正确 URL 是 `http://localhost:8080/bundle.js`，对应的 index.html 应该修改为：
```html
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <div id="app"></div>
    <!--导入 DevServer 输出的 JavaScript 文件-->
    <script src="bundle.js"></script>
</body>
</html>
```

### 模块热替换 `--hot`

除了通过重新刷新整个网页来实现实时预览，DevServer 还有一种被称作模块热替换的刷新技术。 模块热替换能做到在不重新加载整个网页的情况下，通过将被更新过的模块替换老的模块，再重新执行一次来实现实时预览。 模块热替换相对于默认的刷新机制能提供更快的响应和更好的开发体验。 模块热替换默认是关闭的，要开启模块热替换，你只需在启动 DevServer 时带上 --hot 参数，重启 DevServer 后再去更新文件就能体验到模块热替换了。

### Source Map `--devtool source-map`

在浏览器中运行的 JavaScript 代码都是编译器输出的代码，这些代码的可读性很差。如果在开发过程中遇到一个不知道原因的 Bug，则你可能需要通过断点调试去找出问题。 在编译器输出的代码上进行断点调试是一件辛苦和不优雅的事情， 调试工具可以通过`Source Map`映射代码，让你在源代码上断点调试。 Webpack 支持生成 Source Map，只需在启动时带上`--devtool source-map`参数。 加上参数重启 DevServer 后刷新页面，再打开 Chrome 浏览器的开发者工具，就可在 Sources 栏中看到可调试的源代码了。