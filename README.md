# 学习NodeJS

[TOC]

## 1、Node.js开发

​       [Node.js](https://nodejs.org/en/)，是基于Chrome V8 JavaScript引擎的JS运行时环境。这个运行时不依赖于Web浏览器，因此在安装Node.js的操作系统中可以直接运行JavaScript。

> Node.js® is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).



​      [npm](https://docs.npmjs.com/)是Node.js软件包的包管理器[^2]，它维护Node.js开发工程。下面以一个HelloWorld工程，介绍Node.js语法和npm的使用。



### （1）Node.js环境搭建[^4]

#### node命令

检查node命令是否安装以及版本号，如下

```shell
$ which node
/usr/local/bin/node
$ node --version
v12.10.0
```



node支持交互命令，可以即时执行代码，如下

```shell
$ node
Welcome to Node.js v12.10.0.
Type ".help" for more information.
> console.log('Hello, Node.js!')
Hello, Node.js!
undefined
> .exit
```



如果node命令不存在，在MacOS下，可以使用brew安装，如下

```shell
$ brew install npm
```



#### npm命令

检查npm命令是否安装以及版本号，如下

```shell
$ which npm
/usr/local/bin/npm
$ npm --version
6.11.3
```

更新npm版本，如下

```shell
$ npm install npm@latest -g
```



使用`npm config list`，查看Node.js环境相关信息，如下

```shell
$ npm config list
; cli configs
metrics-registry = "https://registry.npmjs.org/"
scope = ""
user-agent = "npm/6.13.6 node/v12.10.0 darwin x64"

; userconfig /Users/wesley_chen/.npmrc
email = ""

; builtin config undefined
prefix = "/usr/local"

; node bin location = /usr/local/Cellar/node/12.10.0/bin/node
; cwd = /Users/wesley_chen/GitHub_Projects/HelloNodeJS/01_helloworld
; HOME = /Users/wesley_chen
; "npm config ls -l" to show all defaults.
```



​       使用`npm install -g <package>`，都会安装到`{prefix}/lib/node_modules/`路径下，上面看到prefix是/usr/local，因此刚才使用`npm install npm@latest -g`更新的npm，也会安装到/usr/local/lib/node_modules/目录下。



说明

> 使用`npm config get prefix`命令，也可以获取prefix。



如果要修改全局npm的安装路径，可以修改prefix，如下

```shell
$ cd ~ && mkdir .node_modules_global
$ npm config set prefix=$HOME/.node_modules_global
$ npm config get prefix
/home/sitepoint/.node_modules_global
$ cat .npmrc
prefix=/home/sitepoint/.node_modules_global
$ npm install npm@latest -g
```

还有修改.profile、.bash_profile或.bashrc文件，增加下面一行

```shell
export PATH="$HOME/.node_modules_global/bin:$PATH"
```



使用`npm list`命令，可以列出全局安装的npm包，如下

```shell
$ npm list --global --depth 0
/usr/local/lib
├── http-server@0.11.1
├── npm@6.13.6
└── universal-device@2.0.0
```



使用`npm uninstall`，来卸载npm包，如下

```shell
$ npm uninstall underscore
removed 2 packages in 0.107s
$ npm list
project@1.0.0 /home/sitepoint/project
└── (empty)
```

说明

> 使用`npm uninstall -g`，来卸载全局安装的npm包



使用`npm outdated`，来检查npm包是否有可用更新版本，如下

```shell
$ npm outdated
Package     Current  Wanted  Latest  Location
underscore    1.9.0   1.9.1   1.9.1  project
```

说明

> 使用`npm outdated -g`，来检查全局安装包



使用`npm update`，来更新npm包，如下

```shell
$ npm update underscore
+ underscore@1.9.1
updated 1 package in 0.236s
```





#### npm包的作用

npm包，按照全局模式（-g）和本地模式安装，大概用途分别为

* 全局模式：在命令行中增加npm包提供的命令。这和Ruby的gem包作用是一样的。
* 本地模式：本地Node.js工程添加依赖包



例如，全局安装uglify-js

```shell
$ npm install -g uglify-js
/usr/local/bin/uglifyjs -> /usr/local/lib/node_modules/uglify-js/bin/uglifyjs
+ uglify-js@3.7.4
added 3 packages from 38 contributors in 7.348s
$ which uglifyjs 
/usr/local/bin/uglifyjs
$ uglifyjs example.js -o example.min.js
```



本地安装npm包，参考下面“创建npm包（HelloWorld）”一节。



### （2）创建npm包（HelloWorld）



​       使用`npm init`命令可以创建一个Node.js的npm包工程，执行命令之后（如下），在工程会生成一个配置文件package.json。

```shell
$ mkdir 01_helloworld
$ npm init
...
package name: (01_helloworld) 
version: (1.0.0) 
description: A demo for starting Node.js
entry point: (index.js) 
test command: echo "Error: no test specified" && exit 1
git repository: https://github.com/daydreamboy/HelloNodeJS.git
keywords: Node.js HelloWorld
author: daydreamboy
license: (ISC) 
About to write to /Users/wesley_chen/GitHub_Projects/HelloNodeJS/01_helloworld/package.json:

{
  "name": "01_helloworld",
  "version": "1.0.0",
  "description": "A demo for starting Node.js",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/daydreamboy/HelloNodeJS.git"
  },
  "keywords": [
    "Node.js",
    "HelloWorld"
  ],
  "author": "daydreamboy",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/daydreamboy/HelloNodeJS/issues"
  },
  "homepage": "https://github.com/daydreamboy/HelloNodeJS#readme"
}


Is this OK? (yes) 
```



说明

> 可以使用`npm init -y`命令，默认都设置yes，跳过上面交互提示。



​       package.json是Node.js工程必要的文件，用于组织整个工程。实际上，`npm init`创建的这个Node.js工程除了可以开发代码，还可以用于发布npm包。



如果当前开发的npm包，需要依赖其他包，有两种方式添加依赖包

* 修改package.json的dependencies字段，添加依赖包，然后使用`npm install`安装
* 直接在package.json所在目录下，使用`npm install <package>`安装，该命令会自动修改package.json的dependencies字段



说明

> 如果`npm install <package> --save-dev`安装的npm包，则修改package.json的devDependency字段



package.json的main字段，指定npm包的程序入口文件，这里是index.js，因此把HelloWorld输出，写到这个文件，同时引用刚才依赖包，如下

```javascript
const _ = require('underscore');
console.log(_.range(5));
console.log('hello, world!');
```

在当前npm包工程的下，使用node命令执行这个js文件，如下

```shell
$ node index.js 
[ 0, 1, 2, 3, 4 ]
hello, world!
```

> 示例工程，见01_helloworld



### （3）package.json语法

package.json语法，可以参考[官方文档](https://docs.npmjs.com/files/package.json)。这里介绍比较常用几个属性。



| 属性          | 值类型 | 作用                              |
| ------------- | ------ | --------------------------------- |
| name          | String | npm包的包名                       |
| scripts       | Map    | 设置npm run的command              |
| main          | String | npm包的程序入口文件               |
| dependencies  | Map    | 设置当前工程依赖的npm包           |
| devDependency | Map    | 设置当前工程开发模式下依赖的npm包 |



#### scripts

示例配置，如下

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "hello": "echo \"Hello, world!\""
  }
}
```



使用`npm run <command>`，可以执行scripts配置的命令行。例如

```shell
$ npm run hello

> 01_helloworld@1.0.0 hello /Users/wesley_chen/GitHub_Projects/HelloNodeJS/01_helloworld
> echo "Hello, world!"

Hello, world!
```

如果只需要命令行的输出结果，可以加上`--silent`选项，如下

```shell
$ npm run hello --silent
Hello, world!
```



#### dependencies

示例配置，如下

```json
{
  "dependencies": {
    "underscore": "^1.9.0"
  }
}
```

​      当修改了dependencies属性后，需要使用`npm install`，重新安装依赖包。在package.json所在文件夹下的node_modules目前存放对应的npm包。

```shell
$ npm install
npm notice created a lockfile as package-lock.json. You should commit this file.
added 1 package from 1 contributor and audited 1 package in 1.861s
found 0 vulnerabilities

$ ls node_modules 
underscore
```



### （4）npm包的版本号规则[^3]

​         npm包的版本号定义为3位，即x.y.z以及相关匹配符号。x.y.z分别代表主版本号（major release）、次版本号（minor release）和补丁版本号（patch release）

* `~`：如果写`~0.13.0`，只允许升级补丁版本号，例如可以升级到`0.13.1`，不允许升级到`0.14.0`
* `^`：如果写`^0.13.0`，允许升级次版本号和补丁版本号，例如`0.13.1`和`0.14.0`
* `*`：如果写`*`，允许升级到所有版本
* `>`：如果写`>x.y.z`，允许升级到大于x.y.z的所有版本
* `>=`：如果写`>=x.y.z`，允许升级到大于或等于x.y.z的所有版本
* `<=`：如果写`<=x.y.z`，允许升级到小于或等于x.y.z的所有版本
* `<`：如果写`<x.y.z`，允许升级到小于x.y.z的所有版本

* `x.y.z`：如果只写`x.y.z`，只使用x.y.z版本

* `latest`：如果只写`latest`，使用最新的版本



### （5）source map[^12]

Source map是一个JSON文件，用于记录源码转换成实际代码的信息。JS实际代码一般是经过压缩混淆后的，这个给调试带来很大困难。有了source map文件，可以方便调试线上的JS代码。



#### 生成source map文件



##### 配置webpack工程的webpack.config.js

```javascript
module.exports = {
    devtool: 'source-map',
};
```



这里设置devtool参数为`source-map`，实际上devtool参数的值有几个，可以参考这里的[文档](https://webpack.js.org/configuration/devtool/)。

当运行webpack工程时，webpack会自动生成对应.map文件，同时在打包的js代码最后一行，增加下面的注释

```javascript
//# sourceMappingURL=bundle.js.map
```



### （6）搭建Tool工具集的工程

这里介绍如何搭建自己的工具类和对应的test case，方便开发、维护和测试。

npm工程，主要用npm-run-all、webpack、nodemon等工具

```shell
$ npm install -D npm-run-all webpack nodemon
```

package.json的配置[^23]，如下

```json
{
  "scripts": {
    "start": "npm-run-all --parallel watch:server watch:build",
    "watch:build": "webpack --watch",
    "watch:server": "nodemon \"./dist/bundle.js\" --watch \"./dist\""
  },
  ...
}
```

上面的配置，执行`npm run start`可以webpack和nodemon同时监听文件变化，然后重新执行打包后的脚本。

npm工程的结构，如下

```shell
$ tree . -L 2 -I node_modules
.
├── dist
│   └── bundle.js
├── library
│   ├── ObjectTool.js
│   └── StringTool.js
├── package-lock.json
├── package.json
├── src
│   ├── index.js
│   ├── test_ObjectToo.js
│   └── test_StringTool.js
└── webpack.config.js
```

index.js的内容，如下

```javascript
import {run as run1} from './test_StringTool';
import {run as run2} from './test_ObjectToo';

run1();
run2();
```

> 示例工程，见05_Tools



## 2、npm常用开发包

### （1）webpack[^5]

webpack是一个npm包，它可以将多个js文件打包成一个js文件。



#### 本地安装webpack

```shell
$ npm install webpack --save-dev
$ npm list --depth=0
03_webpack@1.0.0 /Users/wesley_chen/GitHub_Projects/HelloNodeJS/03_webpack
└── webpack@4.41.5
```

注意

> 使用`--save-dev`选项，是因为webpack包并不是当前npm包中代码需要依赖的npm包。



#### 配置package.json文件

```json
{
  "scripts": {
    "build": "webpack -p",
    "watch": "webpack --watch"
  }
}
```

在scripts属性中添加两个命令行：build和watch。

说明

> 1. 安装webpack包后，可以使用webpack命令
> 2. `-p`是让webpack按照生产环境打包，会压缩和混淆js代码



#### 配置webpack.config.js

在package.json所在目录新建webpack.config.js文件，这个文件是webpack的配置文件。

由于js文件，因此可以直接写js代码，如下

```javascript
var path = require('path')

module.exports = {
  entry: './assets/js/index.js',
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
  }
};
```

* 使用require语句，引用Node.js自带的path库
* `__dirname`是Node.js关键词，代表当前文件的所在路径。举个例子，在`~/test`目录下执行`node example.js`，example.js代码中`__dirname`返回~/test字符串
* resolve是path库中处理相对路径的方法，path.resolve(__dirname, 'dist')返回当前webpack.config.js文件下面的dist文件夹的路径

* entry字段：表示webpack打包的入口文件。webpack从这个文件开始搜索需要打包的相关文件
* output.filename字段：打包后文件名
* output.path字段：打包后文件的输出路径



说明

> 如果不希望webpack混淆代码，可以设置mode字段为development[^7]，这样输出的bundle.js文件是可读的
>
> ```javascript
> module.exports = {
>   mode: 'development',
>   entry: './assets/js/index.js',
>   ...
> }
> ```
> 另外，不希望webpack压缩代码[^11]（变量名替换），可以设置optimization参数，如下
>
> ```javascript
> module.exports = {
>     optimization:{
>         minimize: false, // <---- disables uglify.
>         // minimizer: [new UglifyJsPlugin()] if you want to customize it.
>     }
> }
> ```



#### 示例工程结构

```shell
$ tree . -L 3 -I node_modules
.
├── assets
│   └── js
│       ├── greeter1.js
│       ├── greeter2.js
│       └── index.js
├── dist
├── index.html
├── package-lock.json
├── package.json
└── webpack.config.js
```

> 示例工程，见03_webpack



由于index.js是打包的入口文件，因此程序代码写在这个文件中，如下

index.js

```javascript
import greet from './greeter1.js';

console.log("I'm the entry point");
greet();
```



index.js可以引用其他js module，例如greeter1.js文件，如下

```javascript
function greet() {
    console.log('Have a great day!');
};

export default greet;
```



#### 运行webpack命令

还记得在package.json配置的build命令吗？在npm包工程下，执行`npm run build`命令，如下

```shell
$ npm run build

> 03_webpack@1.0.0 build /Users/wesley_chen/GitHub_Projects/HelloNodeJS/03_webpack
> webpack -p

Hash: 34c17ae2ee5749ed1160
Version: webpack 4.41.5
Time: 239ms
Built at: 01/12/2020 4:54:05 PM
    Asset   Size  Chunks             Chunk Names
bundle.js  1 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./assets/js/greeter1.js 0 bytes {0} [built]
[1] ./assets/js/index.js 80 bytes {0} [built]
```

说明

> webpack命令，依赖webpack-cli包，上面会提示是否安装webpack-cli包，同时同步到package.json文件中。



可以看到greeter1.js和index.js都打包到dist/bundle.js中，而且bundle.js是经过压缩混淆的。

为了验证bundle.js是否能在浏览器中正确执行，在index.html文件引入bundle.js，如下

index.html

```html
<html>
<head>
    <script src="./dist/bundle.js"></script>
</head>
<body></body>
</html>
```



在浏览器中打开index.html文件，在console可以看到输出，如下

```text
I'm the entry point
Have a great day!
```



注意

> webpack只是将多个js文件打包成一个js文件，但不检查js文件中语法问题，有可能打包后，运行js文件后浏览器报错



#### 引用外部依赖包

​        刚才index.js引用greeter1.js，没有引入外部依赖包。对于webpack打包来说，引用外部依赖包，不需要额外的配置，按照npm包的引入方式就可以，例如greeter2.js引用moment库。

```shell
$ npm install moment --save
```



greeter2.js

```javascript
import moment from 'moment';

function greet() {
    var day = moment().format('dddd');
    console.log('Have a great ' + day + '!');
};

export default greet;
```

修改index.js文件，换成引用greeter2.js文件，如下

```javascript
import greet from './greeter2.js';
```



再次运行`npm run build`，然后打开index.html，浏览器console输出，如下

```text
I'm the entry point
Have a great Sunday!
```



注意

> 由于引入了moment库，bundle.js的大小比之前要大很多。



#### 加载loader

loader是webpack在打包、打包前或打包后执行的插件。webpack loader插件可以在[这里](https://webpack.js.org/loaders/)查询。

以使用[eslint-loader](https://webpack.js.org/loaders/eslint-loader/)为例

说明

> jshint[不再维护](https://github.com/webpack-contrib/jshint-loader)，改成eslint



##### 安装loader

```shell
$ npm install eslint-loader eslint --save-dev
```

说明

> 1. eslint-loader依赖eslint，所以eslint也需要一起安装
> 2. 注意使用`--save-dev`选项，因为eslint-loader库是当前npm包代码不需要引用的



##### 配置loader

jshint-loader的配置，如下。具体配置可以参考它的[文档](https://webpack.js.org/loaders/eslint-loader/)

webpack.config.js

```javascript
var path = require('path')

module.exports = {
    entry: './assets/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // eslint options (if necessary)
                },
            },
        ],
    },
};
```



运行`npm run build`，可以发现控制台中，多出一些warning，如下

```shell
$ npm run build                              

> 03_webpack@1.0.0 build /Users/wesley_chen/GitHub_Projects/HelloNodeJS/03_webpack
> webpack -p

Hash: 952ea980c53c6057679c
Version: webpack 4.41.5
Time: 807ms
Built at: 01/12/2020 5:55:08 PM
    Asset     Size  Chunks                    Chunk Names
bundle.js  263 KiB       0  [emitted]  [big]  main
Entrypoint main [big] = bundle.js
[128] (webpack)/buildin/module.js 497 bytes {0} [built]
[129] ./node_modules/moment/locale sync ^\.\/.*$ 3 KiB {0} [optional] [built]
[130] ./assets/js/index.js + 1 modules 244 bytes {0} [built] [2 warnings]
      | ./assets/js/index.js 80 bytes [built] [1 warning]
      | ./assets/js/greeter2.js 159 bytes [built] [1 warning]
    + 128 hidden modules

WARNING in ./assets/js/index.js
Module Warning (from ./node_modules/eslint-loader/dist/cjs.js):
No ESLint configuration found in /Users/wesley_chen/GitHub_Projects/HelloNodeJS/03_webpack/assets/js.

WARNING in ./assets/js/greeter2.js
Module Warning (from ./node_modules/eslint-loader/dist/cjs.js):
No ESLint configuration found in /Users/wesley_chen/GitHub_Projects/HelloNodeJS/03_webpack/assets/js.
 @ ./assets/js/index.js 1:0-34 4:0-5

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  bundle.js (263 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (263 KiB)
      bundle.js


WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
```



#### 加载plugin

webpack自身是基于plugin搭建的，plugin能完成loader不能完成的任务。webpack plugin插件可以在[这里](https://webpack.js.org/plugins/)查询。

以使用[UglifyjsWebpackPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)为例



##### 安装plugin

```shell
$ npm install uglify-js uglifyjs-webpack-plugin --save-dev
```

> uglifyjs-webpack-plugin是基于uglify-js的，因此uglify-js也要安装



##### 配置plugin

uglifyjs-webpack-plugin的配置，如下。具体配置可以参考它的[文档](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)

webpack.config.js

```javascript

```





### （2）nodemon

[nodemon](https://github.com/remy/nodemon)是类似node命令的一个npm包，除了可以执行Node.js代码外，还可以建立监听，当对应的文件内容变化时，不用重新运行命令，就自动执行文件。



安装nodemon包，如下

```shell
$ npm install nodemon --save-dev
```



配置package.json的运行命令[^8]，如下

```json
{
  "scripts": {
    "monitor": "nodemon src/index.js",
  },
  ...
  "devDependencies": {
    "nodemon": "^2.0.2"
  }
}
```



index.js的代码，如下

```javascript
console.log('Hello ever running Node.js project.');
```



然后运行npm的run命令，如下

```shell
$ npm run monitor

> 04_nodemon@1.0.0 monitor /Users/wesley_chen/GitHub_Projects/HelloNodeJS/04_nodemon
> nodemon src/index.js

[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/index.js`
Hello ever running Node.js project.
[nodemon] clean exit - waiting for changes before restart
```



说明

> 每次修改index.js文件，不用重新执行上面的命令，nodemon会自动重新执行。



### （3）babel

[babel](https://babeljs.io/)也是npm包，它是一个JavaScript编译器，将JS代码转成浏览器兼容的代码。



babel的安装，可以基于webpack，也可以基于package.json来安装。



#### 基于webpack的安装

下面介绍基于webpack的安装方法[^6]



##### 安装loader

babel的webpack插件是babel-loader，当然也需要安装babel自身。

```shell
$ npm install babel-loader @babel/core @babel/preset-env --save-dev
```

这里安装@babel/preset-env，是因为需要babel的预置环境



##### 配置webpack.config.js

```javascript
var path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ],
    },
};
```

* test字段，用于哪些文件需要babel处理
* exclude字段，用于哪些文件不处理。这里有一个坑，官方文档使用的是`exclude: /node_modules/`，但实际上用`exclude: '/node_modules/'`更好。
* plugins字段，用于应用哪些babel插件。注意这些插件也需要用npm安装，如下

```shell
$ npm install @babel/plugin-proposal-object-rest-spread @babel/plugin-proposal-class-properties --save-dev
```



#### 基于package.json的安装[^8]



##### 安装相关npm包

```shell
$ npm install -D @babel/core @babel/node @babel/preset-env nodemon
```



##### 增加package.json的命令

```json
{
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js"
  },
  ...
}
```

`--exec`是nodemon命令的选项，用于执行其他命令，例如`nodemon --exec python app.py`。



说明

> 安装全局的nodemon，可以使用`nodemon --help`查看帮助信息。



##### 配置.babelrc文件

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```



### （4）esm

[esm](https://www.npmjs.com/package/esm)（ECMA Script Module）是支持es6语法的module loader，能在Node.js代码中支持import语法。



#### 安装esm包

新建npm工程，安装esm包

```shell
$ npm init esm -y
```

或者现有工程，安装esm包

```shell
$ npm install esm --save
```



注意

> npm init esm -y，不适用安装其他npm包，例如`npm init dotenv -y`会报错。



#### 示例工程[^9]



server.js

```javascript
import express from 'express';
const app = express();

// respond with "Hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('Hello, world');
});

app.listen(3000, () => console.log('Example app listening on port 3000! Open http://localhost:3000/'));
```



目前Node.js不支持import语法。如果直接执行，则报错如下

```shell
$ node server.js 
/Users/wesley_chen/GitHub_Projects/HelloNodeJS/09_esm/server.js:1
import express from 'express';
       ^^^^^^^

SyntaxError: Unexpected identifier
    at Module._compile (internal/modules/cjs/loader.js:872:18)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)
    at Module.load (internal/modules/cjs/loader.js:790:32)
    at Function.Module._load (internal/modules/cjs/loader.js:703:12)
    at Function.Module.runMain (internal/modules/cjs/loader.js:999:10)
    at internal/main/run_main_module.js:17:11
```



#### 使用esm

使用esm有下面三种方式



##### node命令结合esm

```shell
$ node -r esm server.js
```

说明

> --r, --require：用于预加载module



##### nodemon命令结合esm

```shell
$ nodemon -r esm server.js
```



##### 入口代码中引入esm module

index.js

```javascript
// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
require = require("esm")(module/* , options */)
module.exports = require("./server.js")
```

在入口文件（例如index.js）中，重定义require，然后引用原来的入口文件（server.js）。这样执行node或nodemon命令，不用加`-r esm`参数。

> 示例工程，见09_esm



### （5）dotenv[^8]

[dotenv](https://www.npmjs.com/package/dotenv)，提供`.env`文件用于配置私有的环境变量值，并把`.env`中的键值对装载到process.env中。

注意

> `.env`文件，应该放到.gitignore文件中，不能让其他人访问。



#### 安装dotenv包

```shell
$ npm install dotenv --save
```



#### 配置.env文件

```properties
MY_SECRET=mysupersecretpassword
```



#### 引入dotenv的config模块



##### 代码引入

代码引入有两种方式，使用require方式或者import方式，如下

* require方式

```javascript
require('dotenv').config()

console.log('Hello main.js!');
console.log('main.js: ' + process.env.MY_SECRET);
```

* import方式（需要esm支持）

```javascript
import 'dotenv/config';
import './not_import_dotenv';

console.log('Hello index.js!');
console.log('index.js: ' + process.env.MY_SECRET);
```

注意

> 当dotenv/config在not_import_dotenv引用之前，not_import_dotenv中就可以使用process.env来访问.env文件的变量，不需要再引用一次，但是不推荐使用这种隐式方式。在使用process.env的文件中都显式引入dotenv/config。



##### 预加载引入[^10]

```json
{
  "scripts": {
    "preload": "nodemon -r dotenv/config src/not_import_dotenv.js",
  },
  ...
}
```

node或nodemon命令使用`-r`选项来预加载dotenv/config模块



### （6）typescript[^13]

typescript提供tsc命令，用于编译ts文件，输出js文件。



#### 安装typescript包

```shell
$ npm install typescript -D
```



#### 配置tsconfig.json

tsconfig.json用于配置编译选项，可以用下面命令自动生成一个tsconfig.json。

```shell
$ npm run tsc -- --init
```

说明

> tsconfig.json中的key/value配置，也可以在上面命令行添加参数。例如
>
> ```shell
> $ npm run tsc -- --init --rootDir src --outDir dist
> ```



tsc是package.json中配置的命令，如下

```json
  "scripts": {
    "tsc": "tsc"
  },
```



#### 示例工程

```typescript
function hello(message: string) {
    console.log('Hello, ' + message);
}

let message: string = 'typescript!';
// Error: Type '100' is not assignable to type 'string'.
//message = 100;

hello(message)
```



### （7）ts-node[^14]

ts-node提供ts-node命令，用于编译ts和执行产物js文件。

```shell
$ ts-node script.ts
```



### （8）jest[^16]

​       jest是一个JavaScript测试框架，用于创建、运行和组织测试case。它支持TypeScript、Node、React、Vue等各种类型工程。



#### 安装jest包

```shell
$ npm i jest --save-dev
```



#### 配置package.json

```json
  "scripts": {
    "test": "jest"
  },
```



#### 配置代码覆盖率

jest配置代码覆盖率，有三种方法

* 执行npm的script命令中加上`--coverage`。如下

```shell
$ npm test -- --coverage
```

* package.json的script命令中加上`--coverage`。如下

```json
  "scripts": {
    "test": "jest --coverage"
  },
```

* package.json的jest字段，配置`"collectCoverage": true`。如下

```json
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "collectCoverage": true
  },
```



#### 生成html报告

jest配置代码覆盖率可以生成html报告。在package.json的jest字段，配置如下

```json
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "collectCoverage": true,
    "coverageReporters": ["html"]
  },
```



#### 示例工程[^17]

以一个简单的单元测试工程为例，步骤如下

* 创建`__test__`文件夹，用于存放单元测试，一般文件命名为xxx.spec.js。举个例子，如下

```javascript
const filterByTerm = require("../filterByTerm")

describe('Filter function', function () {
    test("it should filter by a search term (link)", () => {
       const input = [
           { id: 1, url: "https://www.url1.dev" },
           { id: 2, url: "https://www.url2.dev" },
           { id: 3, url: "https://www.link3.dev" }
       ];

       const output = [{ id: 3, url: "https://www.link3.dev" }];

       expect(filterByTerm(input, 'link')).toEqual(output);
       expect(filterByTerm(input, "LINK")).toEqual(output);
    });
});
```

* 根据TTD原则，先准备测试case，然后编写开发代码。这里filterByTerm函数，如下

```javascript
function filterByTerm(inputArr, searchTerm) {
    if (!searchTerm) throw Error("searchTerm cannot be empty");
    if (!inputArr.length) throw Error("inputArr cannot be empty");
    const regex = new RegExp(searchTerm, "i");
    return inputArr.filter(function(arrayElement) {
        return arrayElement.url.match(regex);
    });
}

module.exports = filterByTerm;
```

* 执行单元测试

```shell
$ npm test
```



### （9）rxjs

[rxjs](http://reactivex.io/rxjs/)是实现[Reactive X](http://reactivex.io/)的JavaScript库。[官方文档](https://rxjs-dev.firebaseapp.com/guide/overview)对rxjs介绍，如下

​      RxJs是一个采用可观察序列处理事件和异步的，提供核心类型Observable，附属类型Observer、Scheduler、Subjects，以及操作符（map、filter、reduce、every等）

> RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the [Observable](https://rxjs-dev.firebaseapp.com/guide/observable), satellite types (Observer, Schedulers, Subjects) and operators inspired by [Array#extras](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.6) (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.



#### 基本概念

* Observable，代表某个值或事件，在将来可以产生出来
* Observer，代表一组回调用于监听Observable产生的事件或值
* Subscription，代表执行Observable
* Operator，函数式编程风格的函数，例如map、filter、concat、reduce等
* Subject，等价EventEmitter，可以广播值或事件给多个Observer
* Scheduler，中心化的分发器用于控制并发



##### Cold Observable和Hot Observable[^20]

​       Cold Observable启动仅当Subscription调用后，才有值或事件产生。在这之前的值或者事件，Cold Observable没有捕获到的。Hot Observable在Subscription调用后，能接收到所有的值或者事件，包括Subscription调用之前的值或者事件。



#### Observable[^21]

根据数据的生产者和消费者，以及数据是单值还是多值的关系，有下面一个分类表

|      | SINGLE   | MULTIPLE   |
| ---- | -------- | ---------- |
| Pull | Function | Iterator   |
| Push | Promise  | Observable |

* Function，生产者不知道数据何时被处理，消费者主动pull数据来处理，返回数据一般是单次返回
* Iterator，生产者不知道数据何时被处理，消费者主动pull数据来处理，返回数据可以是多次返回
* Promise，生产者主动push数据到消费者，消费者不知道数据何时被处理，返回数据一般是单次返回
* Observable，生产者主动push数据到消费者，消费者不知道数据何时被处理，返回数据可以是多次返回



举个Observable的通用示例代码，如下

Observable.ts

```typescript
import { Observable } from "rxjs";

const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
    next(x) {
        console.log('got value ' + x);
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
});
console.log('just after subscribe');
```



使用Observable分为下面4个过程

* **Creating** Observables
* **Subscribing** to Observables
* **Executing** the Observable
* **Disposing** Observables



##### Creating Observables

使用Observable构造函数，创建Observable实例，带一个subscriber回调。例如上面的代码

```typescript
const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});
```

当Observable实例调用subscribe方法时，会触发subscriber回调。

> rxjs提供一些便利函数，用于创建Observable实例，例如of、from、interval函数等。



##### Subscribing to Observables

使用subscribe方法订阅到Observable实例。例如上面的代码

```typescript
observable.subscribe({
    next(x) {
        console.log('got value ' + x);
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
});
```

subscribe方法，接收3个类型通知，这个和Executing the Observable过程中next、error和complete方法是对应的。

* Next通知，Observable发送一个值（String、Object等），是必须的参数
* Error通知，Observable发送JavaScript错误或者异常，是可选的参数
* Complete通知，Observable不发送任何值，仅标识Observable产生值或者事件已经完全结束，是可选的参数



##### Executing the Observable

​       执行Observable，实际上是执行subscription，在创建Observable时有个subscription回调，该回调函数中有个subscriber参数，可以调用它的next、error和complete方法。

```typescript
const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});
```

推荐使用try-catch，来捕获异常，如下

```typescript
const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});
```

一般调用next可以是0次或无限次，调用error方法0次或者1次，调用complete方法0次或者1次。用正则表达式来描述如下

```javascript
next*(error|complete)?
```



##### Disposing Observables

Disposing Observable，用于结束subscribe关系。可以使用unsubscribe方法来执行默认的行为。

```typescript
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe();
```

也可以在创建Observable时返回一个unsubscribe函数，用于在后面需要Disposing Observable。

```typescript
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
    const intervalId = setInterval(() => {
       subscriber.next('hi');
    }, 1000);

    return function unsubscribe() {
        clearInterval(intervalId);
    }
});

const subscription = observable.subscribe((value) => { console.log(value); });

setTimeout(() => {
    subscription.unsubscribe();
},5000);
```

注意：返回这个unsubscribe方法的调用，在subscription对象调用unsubscribe()方法时调用





#### 搭建rxjs的环境[^19]

准备环境

```shell
$ npm install -D webpack webpack-dev-server webpack-cli typescript ts-loader
```



安装rxjs的npm包

```shell
$ npm install rxjs
```



创建配置文件

webpack.config.js

```javascript
const path = require('path');
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```



tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es6",
    "allowJs": true,
    "lib": [
      "es2017",
      "dom"
    ]
  }
}
```



#### 示例工程

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>RxJS Demo</title>
    <style>
        body { font-family: 'Arial'; background: lightgray }
        ul { list-style-type: none; padding: 20px; }
        li { padding: 15px; background: lightcoral; margin-bottom: 10px; }
    </style>
</head>
<body>
<h1>RxJS Demo</h1>
<div>
    <ul id="list"></ul>
</div>
<script src="/bundle.js"></script>
</body>
</html>
```



index.ts

```typescript
import { Observable } from "rxjs";

let observable = Observable.create((observable:any) => {
    observable.next('Hello world!');
    observable.next('Hello again!');
    observable.complete();
    observable.next('Bye');
});

observable.subscribe(
    (x: any) => logItem(x),
    (error: any) => logItem('Error: ' + error),
    () => logItem('Completed')
);

function logItem(val: any) {
    let node = document.createElement('li');
    let textNode = document.createTextNode(val);
    node.appendChild(textNode);
    document.getElementById('list').appendChild(node);
}
```



#### rxjs语法[^20]

执行ts文件，先安装ts-node包。

```shell
$ npm install ts-node -D
```



在执行ts文件时，可能会出现下面错误[^22]

```shell
$ ts-node basic/of.ts 
/Users/wesley_chen/GitHub_Projects/HelloNodeJS/13_rxjs/basic/of.ts:1
import { of } from "rxjs";
       ^

SyntaxError: Unexpected token {
```

在tsconfig.json中，将"module"设置为"commonjs"



##### of语法

```typescript
import { of } from "rxjs";

const observable = of(1);
const subscription = observable.subscribe(
    (value) => console.log(value),
    (error: any) => console.log(error),
    () => console.log('Done!')
);

subscription.unsubscribe();
```













## 3、TypeScript[^1]

TypeScript是强类型的JavaScript代码，经过编译后，变成纯JavaScript代码[^15]。

> **TypeScript is a layer** because you can write TypeScript code in your editor. After a compilation all that TypeScript stuff is gone and you're left with plain, simple JavaScript.



### （1）基本数据类型

* Boolean

```typescript
let isDone: boolean = false;
```



* Number

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```



* String

**支持单引号和双引号**

```typescript
let color: string = "blue";
color = 'red';
```

**模板字符串**

```typescript
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```

<code>``</code>用于定义模板字符串，其里面的占位变量，可以使用<code>${var}</code>方式。

模板字符串还支持raw字符串方式（所见即所得），换行不用使用转义符`\n`。上面sentence变量等价于下面

```typescript
let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";
```



* Array

```typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

数组支持`ElementType[]`和`Array<ElementType>`两种方式



* Tuple

元组定义一组元素，允许每个元素类型不同。元组类型定义后不能改变元素个数。

```typescript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error

console.log(x[0].substring(1)); // OK
console.log(x[1].substring(1)); // Error, 'number' does not have 'substring'

x[3] = "world"; // Error, Property '3' does not exist on type '[string, number]'.

console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'.
```



* Enum

枚举定义一组值，类似C的枚举值。

```typescript
enum Color {Red, Green, Blue}
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

枚举值可以通过下标，转成字符串，例如

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // Displays 'Green' as its value is 2 above
```



* Any

任意类型用于编译时不检查变量类型

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

any和Object类型区别在于，any类型实例，对其调用方法也不做编译时检查。

```typescript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

any类型还可以用于数组放混合类型的元素

```typescript
let list: any[] = [1, true, "free"];

list[1] = 100;
```



* Void

void类型用于函数返回类型

```typescript
function warnUser(): void {
    console.log("This is my warning message");
}
```

void类型也可以用于变量类型，但是只能赋值null（如果编译时没有指定`--strictNullChecks`）或者undefined

```typescript
let unusable: void = undefined;
unusable = null; // OK if `--strictNullChecks` is not given
```



* Null和Undefined

null和undefined既可以作为变量类型，也可以作为变量值。

```typescript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

默认情况下，null和undefined是其他类型的子类型，即null和undefined可以赋值到number类型的变量

如果开启`--strictNullChecks`，null和undefined只能赋值到any类型的变量，或者自身类型变量。

还有一种情况，可以赋值到组合类型变量上，例如`string | null | undefined`



* Never

never类型，用于总是会抛出异常的函数返回值类型。

never类型是其他类型的子类型，并且可以赋值到其他类型，但是其他类型不能赋值到never类型，除了never类型自身。any类型也不能赋值到never类型。

```typescript
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}
```



* Object

​     object类型代表非基础（primitive）类型，即除number、string、boolean、bigint、symbol、null和undefined之外的类型。

```typescript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```



* Type assertion

类型断言，类似其他语言的强制类型转换。有两种方式，如下

**尖括号语法**

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

**as语法**

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```











TypeScript语法介绍如下



### （1）函数

TypeScript的函数签名都必须声明参数和返回值类型。例如

```typescript
function filterByTerm(input: string, searchTerm: string): string {
    console.log('first arg: ' + input);
    console.log('second arg: ' + searchTerm);

    return 'first arg: ' + input + ', ' + 'second arg: ' + searchTerm;
}
```



### （2）变量

TypeScript中的变量需要声明类型，如下

```typescript
// Note: not use var
let aVar: string = 'JavaScript';
aVar = 'TypeScript';

const aConst: string = 'Hello';
// Error: const variable can't be modified
//aConst = 'hello';
```

* let修饰，表示该变量的值可以在初始化后修改
* const修饰，表示该变量的值可以在初始化后不能再修改



### （3）接口（interface）

TypeScript用interface来定义接口，例如

```typescript
interface Link {
	  description?: string;
    id?: number;
    url: string,
    printDetails(): string;
		anotherFunc?(a: number, b: number): number;
}

interface TranslatedLink extends Link {
    language: string;
}
```

* 接口的成员变量称为field。
* 接口继承，可以使用extends关键词
* 成员变量或成员函数，加上后缀`?`，表示该成员是可选的



#### 下标访问

接口可以定义下标访问。例如

```typescript
interface Link {
    description?: string;
    id?: number;
    url: string;
    [index: string]: any;
}
```

* `any`，表示下标返回任意类型
* `[index: string]`，表示下标的类型是`string`



### （4）实例

初始化类的实例，可以直接用map赋值。例如

```typescript
const translatedLink: TranslatedLink = {
    description:
        "TypeScript tutorial for beginners is a tutorial for all the JavaScript developers ...",
    id: 1,
    url: "www.valentinog.com/typescript/",
    language: "en"
}
```



#### this指针

初始化实例时，成员函数可以通过this来引用成员变量。例如

```typescript
interface IPerson {
    name: string;
    city: string;
    age: number;
    printDetails(): string;
    // Note: mark optional
    anotherFunc?(a: number, b: number): number;
}

const tom: IPerson = {
    name: "Tom",
    city: "Munich",
    age: 33,
    printDetails(): string {
        return `${this.name} - ${this.city}`;
    }
}

console.log(tom.printDetails())
```



### （5）别名

TypeScript支持别名，使用`type`关键词来定义。例如

```typescript
type AnyType = any;
type Links = Array<Link>
```

> 示例代码，见xx_type_alias.ts









## 附录

### 1、npm常用命令

#### （1）install

格式：npm install \<package\>     
别名：npm i \<package\>    
说明：安装npm包。-g选项，使用全局安装

> --save-dev，package.json中的devDependencies字段添加依赖     
> --save/--save-prod，package.json中的dependencies字段添加依赖

- npm install，安装包到本地

```shell
$ npm install underscore
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN 01_helloworld@1.0.0 No description
npm WARN 01_helloworld@1.0.0 No repository field.

+ underscore@1.9.0
added 1 package in 4.587s
```

- npm install \<package\>@\<version\>，安装特定版本的包到本地

```shell
$ npm install underscore@1.8.2
npm WARN 01_helloworld@1.0.0 No description
npm WARN 01_helloworld@1.0.0 No repository field.

+ underscore@1.8.2
added 1 package in 4.764s
```

- npm install \<package1\> \<package2\> ...，安装多个包，空格分隔

```shell
$ npm i express momemt lodash mongoose body-parser webpack
```

- npm install \<package1\> --global，全局安装包。全局安装的包，可以使用改命令，而本地安装则使用不了该命令。

```
$ npm install uglify-js --global       
/usr/local/bin/uglifyjs -> /usr/local/lib/node_modules/uglify-js/bin/uglifyjs
+ uglify-js@3.3.25
added 3 packages in 2.293s
$ which uglifyjs
/usr/local/bin/uglifyjs
```



#### （2）uninstall

格式：npm uninstall \<package\>   
别名：npm um \<package\>      
说明：卸载npm包

```
$ npm uninstall underscore
npm WARN 01_helloworld@1.0.0 No description
npm WARN 01_helloworld@1.0.0 No repository field.

removed 1 package in 0.13s
```



#### （3）list

格式：npm list    
别名：npm ls     
说明：列出所有依赖的包

- npm list

```
$ npm list
01_helloworld@1.0.0 /Users/wesley_chen/Ali-Projects/node-projects/01_helloworld
└── underscore@1.9.0
```

- npm ll/la，在npm list基础上列出额外的信息

```
$ npm la
01_helloworld@1.0.0
│ /Users/wesley_chen/GitHub_Projcets/HelloNodeJS/01_helloworld
│ 
└── underscore@1.9.0
    JavaScript's functional programming helper library.
    git://github.com/jashkenas/underscore.git
    http://underscorejs.org
```

- npm list --depth=0，列出第一层级的依赖包

```
$ npm list --depth=0 
03_webpack@1.0.0 /Users/wesley_chen/GitHub_Projcets/HelloNodeJS/03_webpack
├── jshint@2.9.5
├── jshint-loader@0.8.4
├── moment@2.22.1
├── webpack@4.8.3
└── webpack-cli@2.1.3
```



#### （4）outdated

格式：npm outdated
说明：检查npm包更新

```
$ npm outdated
Package     Current  Wanted  Latest  Location
underscore    1.8.2   1.9.0   1.9.0  01_helloworld
```



#### （5）update

格式：npm update
说明：更新npm包。如果要更新所有包，直接`npm update`

```shell
$ npm update underscore
npm WARN 01_helloworld@1.0.0 No description
npm WARN 01_helloworld@1.0.0 No repository field.

+ underscore@1.9.0
updated 1 package in 1.48s
```



#### （6）search

格式：npm search
说明：搜索某个npm包

```shell
$ npm search mkdir
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
mkdir                     | Directory creation…  | =joehewitt      | 2012-04-17 | 0.0.2    | fs      
fs-extra                  | fs-extra contains…   | =jprichardson…  | 2018-05-09 | 6.0.1    | fs file file system copy directory extra mkdirp mkdir mkd
...
```



#### （7）cache

格式：npm cache     
说明：管理npm包的cache，位于~/.npm文件夹下

- npm cache clean，5.3.0版本的npm命令不能直接删除_cacache

```shell
$ npm cache clean
npm ERR! As of npm@5, the npm cache self-heals from corruption issues and data extracted from the cache is guaranteed to be valid. If you want to make sure everything is consistent, use 'npm cache verify' instead.
npm ERR! 
npm ERR! If you're sure you want to delete the entire cache, rerun this command with --force.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/wesley_chen/.npm/_logs/2018-05-20T14_56_15_139Z-debug.log
```

- npm cache clean --force，删除~/.npm/_cacache文件夹

```shell
$ npm cache clean --force
npm WARN using --force I sure hope you know what you are doing.
```

> 如果某个目录下面有多个node工程，可以使用下面命令将多个node_modules文件删除，用于节省磁盘空间。

```shell
$ find . -name "node_modules" -type d -exec rm -rf '{}' +
```



#### （8）help

格式：npm help \<command\>    
说明：查看某个command的帮助信息，例如`npm help install`



#### （9）config

格式：npm config
说明：查看npm配置，子命令有list、get、set等

- npm config list

```
$ npm config list
; cli configs
metrics-registry = "https://registry.npmjs.org/"
scope = ""
user-agent = "npm/5.3.0 node/v8.4.0 darwin x64"

; userconfig /Users/wesley_chen/.npmrc
email = ""

; builtin config undefined
prefix = "/usr/local"

; node bin location = /usr/local/Cellar/node/8.4.0/bin/node
; cwd = /Users/wesley_chen/GitHub_Projcets/HelloNodeJS/03_webpack
; HOME = /Users/wesley_chen
; "npm config ls -l" to show all defaults.
```

- npm config get，查看某个项配置

```
$ npm config get prefix
/usr/local
```



#### （10）init

格式：npm init    
说明：创建一个package.json文件，该文件用于配置node工程

- npm init

```shell
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (03_webpack) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/wesley_chen/GitHub_Projcets/HelloNodeJS/03_webpack/package.json:

{
  "name": "03_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes)
```

- npm init -y，快速创建node工程，默认都是yes（y）

```shell
$ npm init -y
Wrote to /Users/wesley_chen/GitHub_Projcets/HelloNodeJS/03_webpack/package.json:

{
  "name": "03_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```



#### （11）view

##### 查看npm包所有版本号[^18]

格式：npm view <package> versions --json

```shell
$ npm view webpack versions --json
[
  "0.1.0",
  ...
]
```









### 2、常用npm包列表

| 包名                                                     | 常见用法                                  |
| -------------------------------------------------------- | ----------------------------------------- |
| [http-server](https://www.npmjs.com/package/http-server) | `$ http-server -c-1`（禁止缓存）          |
| uglify-js                                                | `$ uglifyjs example.js -o example.min.js` |





### 3、Visual Code常用插件

#### （1）Code Outline 

[Code Outline](https://marketplace.visualstudio.com/items?itemName=patrys.vscode-code-outline)，显示代码结构，方便定位到特定的符号（函数、全局变量等）





## References

[^1]: https://www.typescriptlang.org/docs/home.html

[^2]:https://nodejs.org/en/docs/meta/topics/dependencies/#npm
[^3]:https://flaviocopes.com/package-json
[^4]:https://www.sitepoint.com/beginners-guide-node-package-manager/
[^5]:https://tutorialzine.com/2017/04/learn-webpack-in-15-minutes

[^6]:https://webpack.js.org/loaders/babel-loader/
[^7]:https://webpack.js.org/guides/development/
[^8]:https://www.robinwieruch.de/minimal-node-js-babel-setup

[^9]:https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/
[^10]:https://www.npmjs.com/package/dotenv#preload

[^11]:https://stackoverflow.com/a/51264532
[^12]:https://scotch.io/tutorials/debug-javascript-in-production-with-source-maps

[^13]:https://www.valentinog.com/blog/typescript/
[^14]:https://github.com/TypeStrong/ts-node

[^15]:https://www.valentinog.com/blog/typescript/
[^16]:https://jestjs.io/
[^17]:https://www.valentinog.com/blog/jest/

[^18]:https://stackoverflow.com/a/41416032

[^19]:https://medium.com/codingthesmartway-com-blog/getting-started-with-rxjs-part-1-setting-up-the-development-environment-creating-observables-db76ce053725
[^20]:https://hub.packtpub.com/how-to-create-observables-in-rxjs-tutorial/
[^21]:https://rxjs-dev.firebaseapp.com/guide/observable
[^22]:https://github.com/TypeStrong/ts-node/issues/744

[^23]:https://stackoverflow.com/a/39575186













