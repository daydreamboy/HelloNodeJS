# OCPWorkbench

[TOC]

## 1、介绍OCPWorkbench

OCPWorkbench是OCP的前端工作台。

OCPWorkbench采用ice.js模板的基础Layout生成。

这个工程模板的基本结构，如下

```md
├── build/                         # 构建产物
├── mock/                          # 本地模拟数据
│   ├── index.[j,t]s
├── public/
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码路径
│   ├── components/                # 自定义业务组件
│   │   └── Guide/
│   │       ├── index.[j,t]sx
│   │       ├── index.module.scss
│   ├── layouts/                   # 布局组件
│   │   └── BasicLayout/
│   │       ├── index.[j,t]sx
│   │       └── index.module.scss
│   ├── pages/                     # 页面
│   │   └── Home/                  # home 页面，约定路由转成小写
│   │       ├── components/        # 页面级自定义业务组件
│   │       ├── models.[j,t]sx     # 页面级数据状态
│   │       ├── index.[j,t]sx      # 页面入口
│   │       └── index.module.scss  # 页面样式文件
│   ├── configs/                   # [可选] 配置文件
│   │   └── menu.[j,t]s            # [可选] 菜单配置
│   ├── models/                    # [可选] 应用级数据状态
│   │   └── user.[j,t]s
│   ├── utils/                     # [可选] 工具库
│   ├── global.scss                # 全局样式
│   ├── routes.[j,t]s              # 路由配置
│   └── app.[j,t]s[x]              # 应用入口脚本
├── build.json                     # 工程配置
├── README.md
├── package.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.[j,t]s
├── .gitignore
├── .stylelintignore
├── .stylelintrc.[j,t]s
├── .gitignore
└── [j,t]sconfig.json
```



除了上面的模板生成的文件夹，这里主要介绍src文件夹。



* parser文件夹

  * ocs.m4，用于组合多个子pegjs构成完整ocs.pegjs
  * ocs.pegjs，用于生成ocs-parser.js。使用pegjs命令将pegjs转成js文件

  上面这个过程，可以见ocs_unit_test/generate_pegjs.sh文件

  * ocs-parser.js，是由ocs.pegjs转化成的。这个js文件可以作为module导入其他js代码中使用
  * ocs-runner.js，是ocs-parser.js的驱动代码，用于交互式运行ocs代码和编译ocs代码
    * 交互式运行ocs代码，是指类似irb这种交互式编程
    * 编译ocs代码，是指输入ocs代码，转成ocs引擎可执行的JSON

* ocs_components文件夹。该文件夹是OCS语法的组件，每个pegjs文件是单个语法组件

  * 从01到09的文件名顺序，表示语法层级，根据包含关系，从低到高。如果是同级关系，则序号是一样的
  * 由于语法组件，存在循环依赖或者不能成为独立组件，有些文件名可能类似，比如07_ocs_block_spec_expression_p1.pegjs和07_ocs_group_expression_p1.pegjs。

* ocs_unit_test文件夹。该文件夹是ocs.pegjs的单测文件夹，用于测试ocs.pegjs中各种语法组件

  * generate_pegjs.sh文件，用于生成ocs-parser.js

  * ocs_unit_test文件夹下，存在一对一的m4和pegjs文件，m4文件主要用途用于组合pegjs。当需要修改OCS语法支持时，需要修改pegjs文件，然后运行m4生成对应的pegjs，然后继续写js文件进行单测。

  * test文件夹，存放单测代码

  * tools文件夹，存放单测代码，需要用到工具类

    > 关于ocs_unit_test文件夹下面的文件名序号，存在从02到09的序号，表示语法组件从02到09，层次从低到高。

  * package.json，表示ocs_unit_test文件夹也是可以运行，它有一个index.js，作为入口文件，主要驱动test文件夹下面的代码

