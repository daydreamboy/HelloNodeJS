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

PEG.js使用pegjsmingl导出的parser库，可以使用`--format`参数来指定module类型，但是似乎没有提供ES Module的选项[^2]。

```shell
$ pegjs --help
--format <format>              format of the generated parser: amd,
                               commonjs, globals, umd (default: commonjs)
```

有两种方式，可以支持ES Module

* 修改parser库的导出方式
* 使用esm库



#### a. 修改parser库的导出方式

`--format`参数使用默认值，导出的模块需要require导入，不能使用import。因此，需要修改代码为ES Module导出方式。

将下面代码

```javascript
module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};
```

换成

```javascript
export default {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};
```

> 示例代码，见hello_pegjs_es_module1/pegjs/integer-parser_modified.js

在使用parser库时，需要修改package.json，如下

```json
{
  "name": "hello_pegjs_es_module1",
  "scripts": {
    "test-integer": "node --experimental-modules --es-module-specifier-resolution=node test/test_use_pegjs_modified_by_es_module.js",
  },
  "type": "module",
  ...
}
```

使用代码，如下

```javascript
import IntegerParser from '../pegjs/integer-parser_modified'

function test_normal_1() {
    let input = '123';
    let output;
    output = IntegerParser.parse(input);
    console.log(output);
}
```



#### b. 使用esm库

上面方法需要修改PEG.js生成parser库，需要手动修改或者脚本来处理。可以使用esm库来支持ES Module。

安装esm库，package.json配置，如下

```json
{
  "name": "hello_pegjs_es_module2",
  "scripts": {
    "test-integer": "node -r esm test/test_use_pegjs_by_es_module.js",
  },
  "dependencies": {
    "esm": "^3.2.25",
    "pegjs": "^0.10.0"
  }
}
```

注意

> 指定了`-r esm`选项，就不能指定"type": "module"

使用代码，如下

```javascript
import IntegerParser from '../pegjs/integer-parser'

function test_normal_1() {
    let input = '123';
    let output;
    output = IntegerParser.parse(input);
    console.log(output);
}
```



## 2、PEG.js语法

在上面介绍，提到.pegjs文件。这个文件的内容是根据PEG.js语法，来描述一些语法规则，然后PEG.js根据描述生成一个parser。

以上面integer.pegjs文件的内容为例，如下

```javascript
start = integer
integer = digits:[0-9]* { return digits.join('') }
```

PEG.js语法由一些规则(rule)组成，每个规则必须有一个标志符，后面跟着一个等号和解析表达式(parsing expression)。另外，规则的标志符，可以跟着一个可读的名字。

规则的结构，如下

```shell
identifer "name" = <parsing-expression>
```

如果有多个规则，可以用换行符或者`;`分隔。

官方文档描述，如下

> A rule name must be a JavaScript identifier. It is followed by an equality sign (“=”) and a parsing expression. If the rule has a human-readable name, it is written as a JavaScript string between the name and separating equality sign. Rules need to be separated only by whitespace (their beginning is easily recognizable), but a semicolon (“;”) after the parsing expression is allowed.

integer.pegjs文件中有2个规则，start和integer。

生成parser时（pegjs命令或者generate方法），如果没有指定选项，parser解析则默认从start规则开始。



这篇文章[^3]，归纳PEG.js语法，有两个基本原则

* PEG.js语法，有一个规则列表组成，并且从root开始自上而下的解析，这里root实际就是start规则。如果某个规则，不能从root触发，则这个规则实际是不生效的。
* 规则的定义，类似变量定义，identifier=parsing-expression，parsing-expression类似正则表达式，而且parsing-expression中可以引用其他规则。

原文描述，如下

> 1. A peg grammar is a list of rules and it is interpreted from top to bottom. This is super important - the starting rule is the 'root' of your grammar so any rules that can't be reached from the root are effectively not part of the grammar.
> 2. Rules look like variable declarations and they consist of a name and a parsing expression. A simple parsing expression looks a lot like a regex but importantly they can also include other rules.



大概了解的规则结构后，需要知道parsing-expression是怎么定义的。

PEG.js官方文档[^4]，提供下面一些parsing-expression的结构，如下







## References

[^1]:https://pegjs.org/
[^2]:https://github.com/pegjs/pegjs/issues/423
[^3]:https://nathanpointer.com/blog/introToPeg/
[^4]:https://pegjs.org/documentation#grammar-syntax-and-semantics



