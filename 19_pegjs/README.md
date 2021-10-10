# PEG.js

[TOC]

## 1、介绍PEG.js

PEG.js[^1]是一个解析器的生成器，按照它提供的语法规则，自定义解析规则，然后生成一个解析器，使用这个解析器，就可以解析有一定规则的文本字符串。

官方对PEG.js的描述，如下

> PEG.js is a simple parser generator for JavaScript that produces fast parsers with excellent error reporting. You can use it to process complex data or computer languages and build transformers, interpreters, compilers and other tools easily.



### (1) 安装PEG.js

PEG.js支持npm安装和bower安装。

```shell
$ npm install -g pegjs
```

或

```shell
$ bower install pegjs
```



### (2) 使用PEG.js

以Node.js环境使用为例

使用PEG.js有两种方式

* 使用pegjs命令，将.pegjs文件转成.js文件，这个.js文件是一个parser
* 使用PEG.js提供的API，代码中生成parser



#### a. 使用pegjs命令

在npm全局安装pegjs后，可以使用pegjs命令。`pegjs --help`可以查看帮助信息。

首先，准备一个.pegjs文件，这个文件是PEG.js的语法文件。后面会介绍怎么写这个文件。

执行下面命令

```shell
$ pegjs integer.pegjs
```

生成同名integer.js

或者指定输出文件的文件名

```shell
$ pegjs -o integer-parser.js integer.pegjs
```

有了integer-parser.js文件，可以导入其他js文件中使用。

注意

> integer-parser.js文件，使用CommonJS导出模块的，因此不能使用import语句来导入，需要使用Node.js的require语句来导入。

举个例子，如下

```javascript
const IntegerParser = require('../pegjs/integer-parser');

function test_normal_1() {
    let input = '123';
    let output = undefined;
    output = IntegerParser.parse(input);
    console.log(output);
}
```

这里的parse方法，如果输入的字符串不符合integer.pegjs中描述的语法规则，则会抛出异常。

> 示例代码，见test_integer_by_parser_library.js



#### b. 使用PEG.js提供的API

可以在代码中导入PEG.js库。举个例子，如下

```javascript
let peg = require('pegjs');

function test_normal_1() {
    let parser = peg.generate("start = integer; integer = digits:[0-9]* { return digits.join('') }");

    let input = '123';
    let output;

    output = parser.parse(input);
    console.log(output);
}
```

这里运行时生成一个parser对象，然后调用parser方法，进行字符串分析。

同样parse方法，也可能抛出异常。

> 示例代码，见test_integer_by_api.js



### (3) 使用PEG.js作为ES Module

TODO







## 2、PEG.js语法

在上面介绍，提到.pegjs文件。这个文件的内容是根据PEG.js语法，来描述一些语法规则，然后PEG.js根据描述生成一个parser。









## References

[^1]:https://pegjs.org/





