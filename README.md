# 学习NodeJS

[TOC]



## 1、npm常用命令

### （1）install

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



### （2）uninstall

格式：npm uninstall \<package\>   
别名：npm um \<package\>      
说明：卸载npm包

```
$ npm uninstall underscore
npm WARN 01_helloworld@1.0.0 No description
npm WARN 01_helloworld@1.0.0 No repository field.

removed 1 package in 0.13s
```



### （3）list

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



### （4）outdated

格式：npm outdated
说明：检查npm包更新

```
$ npm outdated
Package     Current  Wanted  Latest  Location
underscore    1.8.2   1.9.0   1.9.0  01_helloworld
```



### （5）update

格式：npm update
说明：更新npm包。如果要更新所有包，直接`npm update`

```
$ npm update underscore
npm WARN 01_helloworld@1.0.0 No description
npm WARN 01_helloworld@1.0.0 No repository field.

+ underscore@1.9.0
updated 1 package in 1.48s
```



### （6）search

格式：npm search
说明：搜索某个npm包

```
$ npm search mkdir
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
mkdir                     | Directory creation…  | =joehewitt      | 2012-04-17 | 0.0.2    | fs      
fs-extra                  | fs-extra contains…   | =jprichardson…  | 2018-05-09 | 6.0.1    | fs file file system copy directory extra mkdirp mkdir mkd
...
```



### （7）cache

格式：npm cache     
说明：管理npm包的cache，位于~/.npm文件夹下

- npm cache clean，5.3.0版本的npm命令不能直接删除_cacache

```
$ npm cache clean
npm ERR! As of npm@5, the npm cache self-heals from corruption issues and data extracted from the cache is guaranteed to be valid. If you want to make sure everything is consistent, use 'npm cache verify' instead.
npm ERR! 
npm ERR! If you're sure you want to delete the entire cache, rerun this command with --force.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/wesley_chen/.npm/_logs/2018-05-20T14_56_15_139Z-debug.log
```

- npm cache clean --force，删除~/.npm/_cacache文件夹

```
$ npm cache clean --force
npm WARN using --force I sure hope you know what you are doing.
```

> 如果某个目录下面有多个node工程，可以使用下面命令将多个node_modules文件删除，用于节省磁盘空间。

```
$ find . -name "node_modules" -type d -exec rm -rf '{}' +
```



### （8）help

格式：npm help \<command\>    
说明：查看某个command的帮助信息，例如`npm help install`



### （9）config

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



### （10）init

格式：npm init    
说明：创建一个package.json文件，该文件用于配置node工程

- npm init

```
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

```
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





## 附录

### 1、常用npm包

| 包名                                                     | 常见用法                         |
| -------------------------------------------------------- | -------------------------------- |
| [http-server](https://www.npmjs.com/package/http-server) | `$ http-server -c-1`（禁止缓存） |
|                                                          |                                  |



### 2、Visual Code常用插件

#### （1）Code Outline 

[Code Outline](https://marketplace.visualstudio.com/items?itemName=patrys.vscode-code-outline)，显示代码结构，方便定位到特定的符号（函数、全局变量等）


