import StringTool from "../library/StringTool";
import LogTool from "../library/LogTool";
import DebugTool from "../library/DebugTool";

function test_truncateString() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let input = '测试时是地方哈是否if的hi个';
    let output;

    output = StringTool.truncateString(input, 8);
    console.log(output);

    output = StringTool.truncateString(input, 8, StringTool.TruncatingStyle.truncatingHead);
    console.log(output);

    output = StringTool.truncateString(input, 8, StringTool.TruncatingStyle.truncatingMiddle);
    console.log(output);
}

function test_checkStringIfEmpty() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let string;

    string = '';
    console.log(StringTool.checkStringIfEmpty(string));

    string = new String();
    console.log(StringTool.checkStringIfEmpty(string));

    string = new String(1);
    console.log(StringTool.checkStringIfEmpty(string));
}

function test_checkStringIfNotEmpty() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let string;

    string = 'abc';
    console.log(StringTool.checkStringIfEmpty(string));

    string = '';
    console.log(StringTool.checkStringIfEmpty(string));

    string = null;
    console.log(StringTool.checkStringIfEmpty(string));
}

function run() {
    LogTool.d('*** StringTool testing ***')
    test_truncateString();
    test_checkStringIfEmpty();
    test_checkStringIfNotEmpty();
}

export { run };
