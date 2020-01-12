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

> 可以使用`npm init --y`命令，默认都设置yes，跳过上面交互提示。



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





## 2、Typescript[^1]









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

- npm init --y，快速创建node工程，默认都是yes（y）

```shell
$ npm init --y
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



### 2、常用npm包

| 包名                                                     | 常见用法                         |
| -------------------------------------------------------- | -------------------------------- |
| [http-server](https://www.npmjs.com/package/http-server) | `$ http-server -c-1`（禁止缓存） |
|                                                          |                                  |



### 3、Visual Code常用插件

#### （1）Code Outline 

[Code Outline](https://marketplace.visualstudio.com/items?itemName=patrys.vscode-code-outline)，显示代码结构，方便定位到特定的符号（函数、全局变量等）





## References

[^1]: https://www.typescriptlang.org/docs/home.html

[^2]:https://nodejs.org/en/docs/meta/topics/dependencies/#npm
[^3]:https://flaviocopes.com/package-json
[^4]:https://www.sitepoint.com/beginners-guide-node-package-manager/



