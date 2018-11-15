# webpack-tea

# 一、概念

> webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle

> WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
>
> 构建就是把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。
>
> - **代码转换**：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
> - **文件优化**：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
> - **代码分割**：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
> - **模块合并**：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
> - **自动刷新**：监听本地源代码的变化，自动重新构建、刷新浏览器。
> - **代码校验**：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
> - **自动发布**：更新完代码后，自动构建出线上发布代码并传输给发布系统。
>
> 构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。



# 二、初始化项目

## 1、创建`package.json`文件

```javascript
npm init
```



## 2、安装`webpack`和`webpack-cli`

```javascript
// 全局
cnpm i webpack -g
// 本地
cnpm i webpack webpack-cli -D
```

> `-D`是指开发环境需要，上线环境不需要。 等同于：`--save-dev`
>
> `-S`是上线需要。等同于：`--save`



## 3、配置`package`中的`scripts`

```javascript
"scripts": {
    "start": "webpack --profile --progress --colors --display-error-details",
    "dev": "webpack --display-modules --profile --progress --colors --display-error-details"
  },
```

>`color`： 输出结果带彩色，比如：会用红色显示耗时较长的步骤；
>
>`profile`： 输出性能数据，可以看到每一步的耗时；
>
>`progress`： 输出当前编译的进度，以百分比的形式呈现；
>
>`display-modules`： 默认情况下 `node_modules` 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块；
>
>`display-error-details`： 输出详细的错误信息；



# 三、配置webpack

## 1、核心概念

### entry：入口

### output：输出

### loader：模块转换器

### plugins：扩展插件

### Module：模块

### Chunk：代码块

> 具体概念，后补，继续...
>
> 参考：https://www.webpackjs.com/concepts/



## 2、创建目录

> 创建 index.html文件
>
> 创建src文件夹  /   index.js文件
>
> 创建webpack.config.js文件
>
> 目录结构，如下：

```javascript
-rw-r--r-- 1 Administrator 197121  276 11月 15 10:59 index.html
drwxr-xr-x 1 Administrator 197121    0 11月 15 10:38 node_modules/
-rw-r--r-- 1 Administrator 197121  720 11月 15 10:41 package.json
-rw-r--r-- 1 Administrator 197121 3214 11月 15 10:58 README.md
drwxr-xr-x 1 Administrator 197121    0 11月 15 10:58 src/
-rw-r--r-- 1 Administrator 197121    0 11月 15 11:00 webpack.config.js
```



## 3、配置生成HTML的插件

```javascript
cnpm i html-webpack-plugin –D
```



## 4、配置`webpack.config.js`文件

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ],
    mode: 'development',
    resolve: {}
}
```



> 此时，执行`npm start` 或 `webpack filename` ， 就会一个`dist`文件夹，包括一个`html`文件和`build.js`文件。
>
> 放到本地服务器上，试试，正常使用！

> 到此，一个简版的webpack配置，已经OK了。先提一版。继续...



>
>
> GIT TAG  : **tag_v1.0_基础版webpack配置**
>
>



## 5、本地服务器

安装`webpack-dev-server`插件

```javascript
cnpm i webpack-dev-server -D
```

修改`package.json`文件

```javascript
"scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack --display-modules --profile --progress --colors --display-error-details"
  },
```

`webpack.config.js`新增配置

```javascript
devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9001,
    compress: true,// 服务器压缩
    open: true,// 自动打开浏览器
    // hot:true//热更新
}
```



> 此时，执行`npm start`命令，会自动打开一个浏览器窗口，端口为`9001`，渲染`dist`文件夹的里面的文件







# 参考

```javascript
https://www.webpackjs.com/concepts/
https://www.webpackjs.com/configuration/
https://blog.csdn.net/sinat_17775997/article/details/80318569
```

