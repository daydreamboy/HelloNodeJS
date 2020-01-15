import StringTool from "./StringTool";

let input = '测试时是地方哈是否if的hi个';
let output;

output = StringTool.truncateString(input, 8);
console.log(output);

output = StringTool.truncateString(input, 8, StringTool.TruncatingStyle.truncatingHead);
console.log(output);

output = StringTool.truncateString(input, 8, StringTool.TruncatingStyle.truncatingMiddle);
console.log(output);

