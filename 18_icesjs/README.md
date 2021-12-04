# 学习ice.js

[TOC]

## 1、关于ice.js

ice.js的中文名是飞冰，是一个基于 React 的研发解决方案，围绕研发框架 icejs 提供完善的领域解决方案，同时结合可视化操作、物料复用等方案降低研发门槛[^1]。



## 2、第一个ice.js应用

按照官方指南[^2]，有两种创建ice.js应用方式

* CLI方式。使用npm命令或者yarn命令
* GUI方式。使用VS Code的AppWorks插件。

这里主要介绍使用CLI方式。



### (1) 初始化一个ice.js应用

使用下面命令，初始化一个ice.js应用

```shell
$ mkdir hello_icejs
$ cd hello_icejs
$ npm init ice
create-ice version: 1.7.5
create-ice args . undefined
? Please select a template (Use arrow keys)
❯ TypeScript + No UI Components 
  TypeScript + Ant Design 
  TypeScript + Fusion Design 
  TypeScript + Fusion Design Pro  
  JavaScript + Fusion Design 
  ice.js plugin development template. 
```

为了简单起见，选择“TypeScript + No UI Components ”，回车执行，输出如下

```shell
$ npm init ice
create-ice version: 1.7.5
create-ice args . undefined
? Please select a template TypeScript + No UI Components
download tarballURL https://registry.npmmirror.com/@alifd/scaffold-simple/download/@alifd/scaffold-simple-1.1.1.tgz
✔ download npm tarball successfully.
clean package.json...

Initialize project successfully.

Starts the development server.

    cd .
    npm install
    npm start


We have prepared develop toolkit for you. 
See: https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks
```

然后继续执行下面命令

```shell
$ npm install
$ npm start
```

命令行终端自动打开http://localhost:3333/网页，显示如下

<img src="images/hello_icejs_without_UI_components.png" style="zoom:25%; float:left" />

由于选择“No UI Components”，因此网页比较简陋。



到这里，总结归纳一下，使用CLI方式，主要有三个步骤

* 初始化工程
* 安装依赖
* 启动工程



ice.js应用也是npm工程结构的，实际上`npm init ice`命令已经预置一份内容到package.json，如下

```json
{
  "name": "@alifd/scaffold-simple",
  "version": "0.1.0",
  "description": "使用 TypeScript，未使用任何 UI 库。",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@iceworks/spec": "^1.0.0",
    "@types/react": "^17.0.2",
    "@types/react-dom": "^17.0.2",
    "eslint": "^7.30.0",
    "ice.js": "^2.0.0",
    "stylelint": "^13.7.2"
  },
  "scripts": {
    "start": "icejs start",
    "build": "icejs build",
    "lint": "npm run eslint && npm run stylelint",
    "eslint": "eslint --cache --ext .js,.jsx,.ts,.tsx ./",
    "eslint:fix": "npm run eslint -- --fix",
    "stylelint": "stylelint \"**/*.{css,scss,less}\""
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ice-lab/react-materials/tree/master/scaffolds/simple"
  },
  "private": true,
  "originTemplate": "@alifd/scaffold-simple"
}
```



可以选择一个“TypeScript + Fusion Design ”模板创建，package.json，如下

```json
{
  "name": "@alifd/scaffold-lite",
  "version": "0.1.0",
  "description": "轻量级模板，使用 TypeScript，仅包含基础的 Layout。",
  "dependencies": {
    "@alifd/next": "^1.19.4",
    "moment": "^2.24.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "@alifd/theme-design-pro": "0.x"
  },
  "devDependencies": {
    "@iceworks/spec": "^1.0.0",
    "build-plugin-moment-locales": "^0.1.0",
    "eslint": "^7.30.0",
    "ice.js": "^2.0.0",
    "stylelint": "^13.2.0",
    "build-plugin-ignore-style": "^0.1.0",
    "@types/react": "^17.0.2",
    "@types/react-dom": "^17.0.2"
  },
  "scripts": {
    "start": "icejs start",
    "build": "icejs build",
    "lint": "npm run eslint && npm run stylelint",
    "eslint": "eslint --cache --ext .js,.jsx,.ts,.tsx ./",
    "eslint:fix": "npm run eslint -- --fix",
    "stylelint": "stylelint \"**/*.{css,scss,less}\""
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/alibaba-fusion/materials/tree/master/scaffolds/scaffold-lite"
  },
  "private": true,
  "originTemplate": "@alifd/scaffold-lite"
}
```

可以看出多了一些npm库的依赖。



### (2) ice.js应用的目录结构

官方介绍ice.js应用的目录结构，如下

```shell
├── .ice/             // 运行时生成的临时目录
├── build/            // 构建产物目录
├── mock/             // 本地模拟数据
│ ├── index.js
├── public/           // 静态资源
│ ├── index.html      // 应用入口 HTML
│ └── favicon.png     // Favicon
├── src/              // 源码
│ ├── components/     // 自定义业务组件
│ ├── layouts/        // 布局组件
│ ├── pages/          // 路由页面组件
│ ├── models/         // 应用级数据状态
│ ├── global.scss     // 全局样式
│ ├── config.ts       // 运行时配置
│ ├── routes.ts       // 路由配置
│ └── app.tsx          // 应用入口
├── build.json        // 工程配置
├── package.json
└── tsconfig.json
```

说明

> 根据不同的应用模板创建，上面的结构可能有差异



| 文件夹名      | 作用                                                         | 说明 |
| ------------- | ------------------------------------------------------------ | ---- |
| .ice/         | 运行 icejs 项目时默认生成的临时目录，该目录不需要进行 git 提交。 |      |
| build/        | 运行 `npm run build` 后的构建产物目录。                      |      |
| mock/         | 本地模拟数据的目录。                                         |      |
| public/       | 静态资源目录，默认包含 `index.html` 和 `favicon.png`。       |      |
| src/          | 源码目录                                                     |      |
| components/   | 项目通用的组件目录                                           |      |
| layouts/      | 项目的布局文件目录，布局通常包含导航配置，布局组件，样式三部分 |      |
| models/       | 项目的全局数据模型目录，通常包含多个 model 文件              |      |
| pages/        | 项目的页面文件目录，页面通常包含数据模型，页面组件、样式三部分 |      |
| app.tsx       | 项目的入口文件，用于对应用进行全局配置，包括路由、运行环境、请求、日志等 |      |
| config.ts     | 项目的环境配置，用于根据不同环境进行区分配置。               |      |
| global.scss   | 全局的样式配置，框架默认会引入该文件。                       |      |
| routes.ts     | 应用的路由配置文件。                                         |      |
| build.json    | 应用的工程配置文件。                                         |      |
| package.json  | 应用所需要的各种模块，以及配置信息（比如名称、版本、许可证等元数据）。 |      |
| tsconfig.json | TypeScript 编译所需的配置文件。                              |      |





有些文件夹，有特定的结构。例如

* components/，推荐的目录形式如下

```shell
Guide/
├── index.tsx
├── index.module.scss
└── **tests** # 就近测试用例
```



* layouts/，推荐的目录形式如下

```shell
BasicLayout/
├── menuConfig.ts # 布局对应的菜单配置
├── index.tsx
└── index.module.scss
```



* models/，推荐的目录形式如下

```shell
models/
├── foo.ts
└── bar.ts
```



* pages/，推荐的目录形式如下

```shell
Home/ # Home 页面
├── model.ts # 页面级数据状态
├── index.tsx # 页面入口
└── index.module.scss # 页面样式文件
```



### (3) 应用入口配置

在上面介绍，可以知道src/app.ts是应用的入口文件。

```javascript
import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
};

runApp(appConfig);
```

> 示例代码，见ice_fusion_design

可以知道应用的页面渲染，都是通过runApp函数。它有一个Object参数，类型是IAppConfig

官方文档描述了IAppConfig参数支持哪些配置[^3]，如下

```javascript
import { runApp } from 'ice';

const appConfig = {
  app: {
    // 可选，默认 ice-container，根节点 id
    rootId: 'ice-container',

    // 可选，根节点 DOM 元素，更灵活的 rootId
    mountNode: document.getElementById('ice-container'),

    // 可选，默认 true，是否解析路由组件的查询参数
    parseSearchParams: true,

    // 可选，默认 false，是否开启 React.StrictMode，icejs 2.0 开始支持
    strict: false,

    // 可选，自定义添加 Provider
    addProvider: ({ children }) => {
      return <ConfigProvider>{children}</ConfigProvider>;
    },

    // 可选，常用于 SSR 场景或者初始化异步获取数据的场景
    // 如果返回字段中包含 initialStates 字段将会作为状态管理 store 的初始值
    // 如果返回字段中包含 auth 字段将会作为权限管理 auth 的初始值
    getInitialData: async() => {
      const result = await request();
      return result;
    },

    // 可选，自定义错误边界的 fallback UI
    ErrorBoundaryFallback: <div>渲染错误</div>,

    // 可选，自定义错误的处理事件
    onErrorBoundaryHandler: (error, componentStack) => {
      // Do something with the error
    },

    // 可选，SPA 场景下渲染一个简单组件，不再引入 react-router 的路由系统
    // 需要配合设置 build.json 的 router 项为 false
    renderComponent: SimpleComponent,
  },
};

runApp(appConfig);
```



### (4) 工程配置

使用`npm init ice`，会在package.json里面，添加下面2个build script，如下

```json
{
  "scripts": {
    "start": "icejs start",
    "build": "icejs build",
  }
}
```

可见ice.js提供了icejs命令行工具，并且有start和build两个命令。

注意

> `npm install -g ice`安装全局icejs，但是没有icejs命令。

关于start和build两个命令的选项，参考下官方文档吧

```shell
$ icejs start --help

Usage: icejs start [options]

Options:
  -p, --port <port>      服务端口号
  -h, --host <host>      服务主机名
  --config <config>      指定配置文件
  --https                支持开启 https
  --analyzer             支持开启构建分析
  --analyzer-port <port> 支持定制构建分析端口
  --disable-reload       禁用热更新模块
  --disable-mock         禁用 mock 服务
  --disable-open         禁止浏览器默认打开行为
  --disable-assets       禁止 Webpack assets 的输出
```



```shell
$ icejs build --help

Usage: icejs build [options]

Options:
  --analyzer             同 start
  --analyzer-port <port> 同 start
  --config <config>      同 start
```



ice.js应用有自己的配置文件build.json。以ice_fusion_design的build.json为例，如下

```json
{
  "vite": true,
  "plugins": [
    [
      "build-plugin-moment-locales",
      {
        "locales": [
          "zh-cn"
        ]
      }
    ],
    [
      "build-plugin-ignore-style",
      {
        "libraryName": "@alifd/next"
      }
    ]
  ]
}
```



如果不使用json格式，可以换成js格式，在start和build两个命令中，指定js文件，如下

```json
{
  "scripts": {
    "start": "icejs start --config build.config.js",
    "build": "icejs build --config build.config.js"
  }
}
```

换成js格式后，配置文件build.config.js，通过 JS 模块的方式指定配置，如下

```javascript
module.exports = {
  define: {
    env: process.env.NODE_ENV,
  },
  plugins: [
    [
      'build-plugin-fusion',
      {
        themePackage: '@icedesign/theme',
      },
    ],
    (api) => {
      api.onGetWebpackConfig((config) => {
        config.entry('src/index.js');
      });
    },
  ],
};
```





## 3、OCPWorkbench

OCPWorkbench是基于ice.js的一个web应用。



### (1) 创建OCPWorkbench

采用“TypeScript + Fusion Design”模板。







## References

[^1]:https://ice.work/docs/guide/about
[^2]:https://ice.work/docs/guide/start
[^3]:https://ice.work/docs/guide/basic/app
