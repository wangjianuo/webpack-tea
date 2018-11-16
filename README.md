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

> 功能：自动能产出HTML文件，并在里面引入产出后的资源

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



>
>
>GIT TAG  : **tag_v2.0_新增本地服务器**
>
>



# 四、各种Loader

> 通过使用不同的Loader，Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等
> - **test**：匹配处理文件的扩展名的正则表达式-
> - **use**：loader名称，就是你要使用模块的名称
> - **include/exclude**：手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
> - **query**：为loaders提供额外的设置选项



## 1、`css-loader`

> 安装

```javascript
cnpm i style-loader css-loader -D
```

>  配置`webpack.config.js`

```javascript
 module: {
     rules: [
         {
             test: /\.css$/,
             use: ['style-loader', 'css-loader'],
             include: path.join(__dirname, './src'),
             exclude: /node_modules/
         }
     ]
 },
```

> 创建文件src/css/base.css

```javascript
html {
    background: #ccc;
}
```

> 在`index.js` 中`import`一下`base.css`文件

```javascript
import base from './css/base.css'
```



> 此时，执行下`npm start`, 浏览器窗口背景色是`#ccc`了。
>
> 查看下网页的元素，可以看到生成了`style`标签。

```html
<style type="text/css">html {
    background: #ccc;
}</style>
```

> 总结：
>
> 1、先通过`css-loader`处理`css`后；
>
> 2、然后，通过`style-loader`生成`<style></style>`标签；



>
>
> GIT TAG：**tag_v3.0_兼容cssloader**
>
>



## 2、图片

安装

```javascript
cnpm i file-loader url-loader -D
```

> `file-loader` 解决CSS等文件中的引入图片路径问题
> `url-loader `当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝



增加配置

```javascript
{
	test: /\.(jpg|png|gif|svg)$/,
	use: 'url-loader',
	include: path.join(__dirname, './src'),
	exclude: /node_modules/
}
```



添加图片1:

```javascript
let logo = require('./images/logo.png');
let img = new Image();
img.src = logo;
document.body.appendChild(img);
```



添加图片2：

```css
.imgLoader {
    width: 100px;
    height: 100px;
    background: url(../images/bg.png);
}
```



> 执行`npm start` ， 图片显示正常。



## 3、优化`html-webpack-plugin`

> - `minify` 是对html文件进行压缩，`removeAttrubuteQuotes`是去掉属性的双引号
> - `hash` 引入产出资源的时候加上哈希避免缓存
> - `template` 模版路径

> 执行`npm run build`命令，然后看到`dist/index.html`，有这样的变化：
>
> 有`hash`效果，没有双引号了. 

```html
<body>
    <script type=text/javascript src=build.js?a245fc13f407f8fb666e></script>
</body>
```



## 4、分离CSS

> 因为CSS的下载和JS可以并行,当一个HTML文件很大的时候，我们可以把CSS单独提取出来加载。

安装

```javascript
cnpm i extract-text-webpack-plugin@next -D
```

修改`webpack.config.js`文件

```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextWebpackPlugin.extract({
                use: 'css-loader'
            }),
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        },
        {
            test: /\.(jpg|png|gif|svg)$/,
            use: 'url-loader',
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        }
    ]
},
plugins: [
    new HtmlWebpackPlugin({
        minify: {
            removeAttributeQuotes: true
        },
        hash: true,
        template: './public/index.html',
        filename: 'index.html'
    }),
    new ExtractTextWebpackPlugin('css/index.css')
],
```



## 5、编译less

安装

```javascript
cnpm i less less-loader -D
```

添加`less`文件

> 创建`src/css/home.less`文件，在`index.js`引用`home.less`

```javascript
import home from './css/home.less'
```

添加`less`配置

```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextWebpackPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            }),
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        },
        {
            test: /\.less$/,
            use: ExtractTextWebpackPlugin.extract({
                use: ['css-loader', 'less-loader'],
                fallback: 'style-loader'
            }),
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        },
        {
            test: /\.(jpg|png|gif|svg)$/,
            use: 'url-loader',
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        }
    ]
}
```

> 执行`npm run build` ，查看`dist`文件夹文件。 生效了。



## 6、编译sass

安装

```javascript
cnpm i node-sass sass-loader -D
```



添加`sass`文件

> 创建`src/css/addr.scss`文件，在`index.js`引用`addr.scss`

```javascript
import addr from './css/addr.scss'
```

添加`sass`配置

```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextWebpackPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            }),
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        },
        {
            test: /\.less$/,
            use: ExtractTextWebpackPlugin.extract({
                use: ['css-loader', 'less-loader'],
                fallback: 'style-loader'
            }),
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: ExtractTextWebpackPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader'
            }),
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        },
        {
            test: /\.(jpg|png|gif|svg)$/,
            use: 'url-loader',
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        }
    ]
}
```

> 执行`npm run build` ，查看`dist`文件夹文件。 生效了。



## 7、CSS3属性前缀

安装

```javascript
cnpm i postcss-loader autoprefixer -D
```

修改`webpack.config.js`

```javascript
{
    test: /\.css$/,
    use: ExtractTextWebpackPlugin.extract({
        use: ['css-loader', 'postcss-loader'],
        fallback: 'style-loader'
    }),
    include: path.join(__dirname, './src'),
    exclude: /node_modules/
}
```

修改css

```css
.circle {
    transform: translateX(100px);
}
```



> 执行`npm run build`，发现控制台报错了，错误信息，如下：

```javascript
ERROR in ./src/css/base.css
Module build failed (from ./node_modules/_css-loader@1.0.1@css-loader/index.js):
ModuleBuildError: Module build failed (from ./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js):
Error: No PostCSS Config found in: E:\Github\webpack-tea\src\css
    at config.load.then (E:\Github\webpack-tea\node_modules\_postcss-load-config@2.0.0@postcss-load-config\src\index.js:55:15)
    at runLoaders (E:\Github\webpack-tea\node_modules\_webpack@4.25.1@webpack\lib\NormalModule.js:286:20)
    at E:\Github\webpack-tea\node_modules\_loader-runner@2.3.1@loader-runner\lib\LoaderRunner.js:364:11
    at E:\Github\webpack-tea\node_modules\_loader-runner@2.3.1@loader-runner\lib\LoaderRunner.js:230:18
    at context.callback (E:\Github\webpack-tea\node_modules\_loader-runner@2.3.1@loader-runner\lib\LoaderRunner.js:111:13)
    at Promise.resolve.then.then.catch (E:\Github\webpack-tea\node_modules\_postcss-loader@3.0.0@postcss-loader\src\index.js:208:9)
 @ ./src/css/base.css

```

> 大概意思说，没有找到PostCSS的配置文件。

在项目的根目录下，创建`postcss.config.js`文件。

```javascript
module.exports = {
    plugins: {
        'autoprefixer': { browsers: 'last 5 version' }
    }
}
```

> 再次执行，`npm run build`命令，发现可以了。

> 看下`dist/css/index.css`，解析成CSS3带前缀的了。如下：

```css
.circle {
    -webkit-transform: translateX(100px);
        -ms-transform: translateX(100px);
            transform: translateX(100px);
}
```



## 8、 转义ES6/ES7/JSX

> Babel是一个编译JavaScript的平台，可以把ES6/ES7,React的JSX转义为ES5

安装

```javascript
cnpm i babel-core babel-loader babel-preset-env babel-preset-stage-0 babel-preset-react -D
```

配置`webpack.config.js`文件

```javascript
{
    test:/\.jsx?$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ["env","stage-0","react"]
        }
    },
    include:path.join(__dirname,'./src'),
    exclude:/node_modules/
}
```



执行`npm start build `, 报错

```javascript
ERROR in ./src/index.js
Module build failed (from ./node_modules/_babel-loader@8.0.4@babel-loader/lib/index.js):
Error: Cannot find module '@babel/core'
 babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:581:15)
    at Function.Module._load (internal/modules/cjs/loader.js:507:25)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (E:\Github\webpack-tea\node_modules\_v8-compile-cache@2.0.2@v8-compile-cache\v8-compile-cache.js:159:20)
    at Object.<anonymous> (E:\Github\webpack-tea\node_modules\_babel-loader@8.0.4@babel-loader\lib\index.js:10:11)
    at Module._compile (E:\Github\webpack-tea\node_modules\_v8-compile-cache@2.0.2@v8-compile-cache\v8-compile-cache.js:178:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (E:\Github\webpack-tea\node_modules\_v8-compile-cache@2.0.2@v8-compile-cache\v8-compile-cache.js:159:20)
    at loadLoader (E:\Github\webpack-tea\node_modules\_loader-runner@2.3.1@loader-runner\lib\loadLoader.js:13:17)
    at iteratePitchingLoaders (E:\Github\webpack-tea\node_modules\_loader-runner@2.3.1@loader-runner\lib\LoaderRunner.js:169:2)
```

> 看错误信息是Babel版本的问题，参考：https://www.npmjs.com/package/babel-loader



解决方案：

> webpack 4.x | babel-loader 8.x | babel 7.x

```javascript
cnpm install -D babel-loader @babel/core @babel/preset-env webpack
```

> webpack 4.x | babel-loader 7.x | babel 6.x

```javascript
cnpm install -D babel-loader@7 babel-core babel-preset-env webpack
```



> 我尝试把`balel-blader`降到7.x，试试。
>
> 先把`package.json`中的` "babel-loader": "^8.0.4",`干掉，再执行下面的命令：

```
cnpm i babel-loader@7 --save-dev
```

> 再次执行 `build`，编译成功。



## 9、调试打包后的代码

> webapck通过配置可以自动给我们`source maps`文件，`map`文件是一种对应编译文件和源文件的方法
>
> - source-map 把映射文件生成到单独的文件，最完整最慢
> - cheap-module-source-map 在一个单独的文件中产生一个不带列映射的Map
> - eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
> - cheap-module-eval-source-map sourcemap和打包后的JS同行显示，没有映射列

配置`webpack.config.js`文件

```javascript
devtool:'eval-source-map'
```





# 参考

```javascript
https://www.webpackjs.com/concepts/
https://www.webpackjs.com/configuration/
https://blog.csdn.net/sinat_17775997/article/details/80318569
```

