import StringTool from "../library/StringTool";

function test_truncateString() {
    let input = '测试时是地方哈是否if的hi个';
    let output;

    output = StringTool.truncateString(input, 8);
    console.log(output);

    output = StringTool.truncateString(input, 8, StringTool.TruncatingStyle.truncatingHead);
    console.log(output);

    output = StringTool.truncateString(input, 8, StringTool.TruncatingStyle.truncatingMiddle);
    console.log(output);
}


function run() {
    console.log('*** StringTool testing ***')
    test_truncateString();
}

export { run };
