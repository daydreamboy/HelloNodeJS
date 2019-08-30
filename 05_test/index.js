import { StringTool } from "./StringTool";

var input = '测试时是地方哈是否if的hi个';
var output;

output = StringTool.truncateString(input, 8);
console.log(output);

output = StringTool.truncateString(input, 8, TruncatingStyle.truncatingHead);
console.log(output);

output = StringTool.truncateString(input, 8, TruncatingStyle.truncatingMiddle);
console.log(output);

