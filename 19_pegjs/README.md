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

生成parser时（pegjs命令或者generate方法），如果没有指定allowedStartRules选项，parser解析则默认从第一个规则开始。

```shell
$ pegjs --help
Usage: pegjs [options] [--] [<input_file>]

Options:
      --allowed-start-rules <rules>  comma-separated list of rules the generated
                                     parser will be allowed to start parsing
                                     from (default: the first rule in the
                                     grammar)
```



举个例子，如下

```javascript
function test_specify_first_rule() {
    let peg = require("pegjs");
    let grammar = "start = [a-z]+; integer = digits:[0-9]* { return digits.join(''); };";
    let parser = peg.generate(grammar, {
        allowedStartRules: ['integer']
    });

    let output = parser.parse("314");
    console.log(output);
}
```



这篇文章[^3]，归纳PEG.js语法，有两个基本原则

* PEG.js语法，有一个规则列表组成，并且从root规则开始自上而下的解析，这里root规则实际就是第一个规则。如果某个规则，不能从root规则触达到，则这个规则实际是不生效的。
* 规则的定义，类似变量定义，identifier=parsing-expression，parsing-expression类似正则表达式，而且parsing-expression中可以引用其他规则。

原文描述，如下

> 1. A peg grammar is a list of rules and it is interpreted from top to bottom. This is super important - the starting rule is the 'root' of your grammar so any rules that can't be reached from the root are effectively not part of the grammar.
> 2. Rules look like variable declarations and they consist of a name and a parsing expression. A simple parsing expression looks a lot like a regex but importantly they can also include other rules.



大概了解的规则结构后，需要知道parsing-expression是怎么定义的。

PEG.js官方文档[^4]，提供下面一些parsing-expression的结构，如下

| parsing-expression                                           | 说明                                                         | 示例                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| "literal"<br/>'literal'<br/>"literal"i<br/>'literal'i        | 严格匹配literal字符串。如果后缀有i，则表示忽略大小写。       | start = "hello"i                                             |
| .                                                            | 仅匹配一个字符。                                             |                                                              |
| [characters]<br/>[characters]i                               | 从集合中仅匹配一个字符。例如`[a-z]`、`[^a-z]`。如果后缀有i，则表示忽略大小写。如果以^开头，则集合的反集。 | `start = [^a-z]`                                             |
| rule                                                         | 匹配另外一个规则。规则identifier必须存在                     | start = integer; integer = digits:[0-9]* { return digits.join('') } |
| ( expression )                                               | 匹配一个子表达式。一般配合其他符号使用，例如+                | start = ('a' / 'b')+                                         |
| expression *                                                 | 重复匹配一个表达式，零次或多次。贪心匹配                     | start = "hello" *                                            |
| expression +                                                 | 重复匹配一个表达式，至少1次或多次。贪心匹配                  | start = "hello" +                                            |
| expression ?                                                 | 匹配一个表达式，0次或1次。                                   |                                                              |
| & expression                                                 | TODO，没整明白                                               |                                                              |
| ! expression                                                 | TODO，没整明白                                               |                                                              |
| & { predicate }                                              | TODO，没整明白                                               |                                                              |
| ! { predicate }                                              | TODO，没整明白                                               |                                                              |
| $ expression                                                 | 如果匹配expression，将匹配的文本返回，而不是匹配的结果。     |                                                              |
| label : expression                                           | 匹配expression，成功后将结果存到label中。label必须是JavaScript标志符。label一般和action一起使用 |                                                              |
| expression<sub>1</sub> expression<sub>2</sub> ... expression<sub>n</sub> | 依次匹配一个expression列表，返回一个匹配的数组               |                                                              |
| expression { action }                                        | 匹配expression，成功后执行action。action里面必须return一个值在action块中 | integer "integer"   = digits:[0-9]+ { return makeInteger(digits); } |
| expression<sub>1</sub> / expression<sub>2</sub> / ... / expression<sub>n</sub> | 依次匹配expression。如果其中一个匹配成功，则返回匹配结果     |                                                              |

说明

> 如果没有特殊说明返回值，上面parsing-expression，匹配成功，返回匹配结果。这里的结果，有可能是输入字符串，也可能是匹配结果的数组。

> 示例代码，见hello_pegjs_syntax/index.js



注意

> expression处理空格是有特殊含义的，比如expression<sub>1</sub> expression<sub>2</sub> ... expression<sub>n</sub>，是由空格组成的。
>
> 如果要匹配空格，则需要单独定义一个规则[^5]，比如
>
> ```properties
> // optional whitespace
> _ = [ \t\r\n]*
> // mandatory whitespace
> __ = [ \t\r\n]+
> ```
>
> 



### 常用解析表达式

#### $ expression用法

如果匹配expression，将匹配的文本返回，而不是匹配的结果。

举个例子，如下

```javascript
function test_expression_$_expression() {
		...
    // Group 2
    grammar = 'start = $( \'0x\' [a-fA-F0-9]+ )';
    parser = peg.generate(grammar);

    // Case 3
    input = '0x123';
    output = parser.parse(input);
    console.log(output); // 0x123

    // Group 3
    grammar = 'start = \'0x\' [a-fA-F0-9]+';
    parser = peg.generate(grammar);

    // Case 4
    input = '0x123';
    output = parser.parse(input);
    console.log(output); // [ '0x', [ '1', '2', '3' ] ]
}
```





### 注释

可以使用`//`和`/*...*/`

> You can also use JavaScript-style comments (`// ...` and `/* ... */`).



### 在初始化块中的JS代码

在第一个规则之前，在初始化块中，可以定义JS函数和全局变量。这些函数和变量，可以在规则的action和{predicate}中可以访问到。

> The first rule can be preceded by an *initializer* — a piece of JavaScript code in curly braces (“{” and “}”). This code is executed before the generated parser starts parsing. All variables and functions defined in the initializer are accessible in rule actions and semantic predicates.

举个例子，如下

```properties
{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

start
  = additive

additive
  = left:multiplicative "+" right:additive { return left + right; }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return makeInteger(digits); }
```



### Action块

在提供提到Action块的语法，如下

| parsing-expression    | 说明                                                         | 示例                                                         |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| expression { action } | 匹配expression，成功后执行action。action里面必须return一个值在action块中 | integer "integer"   = digits:[0-9]+ { return makeInteger(digits); } |

在后面的规则中，这个用法比较常见。action块实际上是一个转换器，用于将匹配成功后数据，再次处理输出。

举个例子，如下

```javascript
function test_action_block() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = digits:[0-9]+ { return parseInt(digits.join(""), 10); }';
    parser = peg.generate(grammar);

    // Case 1
    input = '1234';
    output = parser.parse(input);
    console.log(output); // 1234

    // Group 2
    grammar = 'start = digits:[0-9]+';
    parser = peg.generate(grammar);

    // Case 2
    input = '1234';
    output = parser.parse(input);
    console.log(output); // [ '1', '2', '3', '4' ]
}
```



说明

> action块中支持console.log，因此可以用输出来调试



Action块可以引用表达式上的label，但是如果label对应的表达式是可选的，则该label变量是null。

举个例子，如下

```javascript
function test_action_block_optional_label() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = minus:(\'-\')? digits:[0-9]+ { console.log(\'debug: \' + minus); return (minus ? -1 : 1) * parseInt(digits.join(""), 10); }';
    parser = peg.generate(grammar);

    // Case 1
    input = '1';
    output = parser.parse(input);
    console.log(output); // 1234

    // Case 2
    input = '-2';
    output = parser.parse(input);
    console.log(output); // -2
}
```



### 官方parser例子

官方文档中，有下面一个parser例子，如下

```properties
{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

start
  = additive

additive
  = left:multiplicative "+" right:additive { return left + right; }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return makeInteger(digits); }
```

以上面这个例子，分析PEG.js的规则逻辑：

从整个结构看，有5个规则。第一个规则，即start规则，实际就是additive规则。从上面介绍，知道PEG.js总是从第一个规则开始解析语法。

* additive规则，包括两个或的表达式
  * left:multiplicative "+" right:additive { return left + right; }。action块中，实际处理加法逻辑
  * multiplicative
* multiplicative规则，包括两个或的表达式
  * left:primary "*" right:multiplicative { return left * right; }。action块中，实际处理乘法逻辑
  * primary
* primary规则，包括两个或的表达式
  * integer
  * "(" additive:additive ")" { return additive; }。这个表达式，有点特殊，如果是(xx)结构，要求xx满足additive规则，这显然形成一个环，回到additive规则的解析上
* integer规则，仅包括一个表达式
  * digits:[0-9]+ { return makeInteger(digits); }。action块中，实际将匹配成功的字符串，转成数字。方便调用integer规则时返回数字结果。

了解上面全部规则后，大概知道这个parser可以用于解析加法和乘法的混合运算。在这个平台[^6]，可以做一些验证。

在验证过程，发现这个parser有个问题，它的输入算术表达式不支持空格。

那么我重新定义了一个space，如下

```properties
space = ' ' *
```

并重新修改了其他规则，用到了space规则，如下

```properties
{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

start
  = additive

additive
  = left:multiplicative space "+" space right:additive { return left + right; }
  / multiplicative

multiplicative
  = left:primary space "*" space right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" space additive:additive space ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return makeInteger(digits); }
  
space = ' ' *
```

上面parser可以支持下面带空格的算术表达式

```tex
(3 + 4 * 3) * 4
```





## References

[^1]:https://pegjs.org/
[^2]:https://github.com/pegjs/pegjs/issues/423
[^3]:https://nathanpointer.com/blog/introToPeg/
[^4]:https://pegjs.org/documentation#grammar-syntax-and-semantics
[^5]:https://stackoverflow.com/questions/8257184/ignore-whitespace-with-peg-js

[^6]:https://pegjs.org/online



