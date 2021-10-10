import IntegerParser from '../pegjs/integer-parser'

function test_normal_1() {
    let input = '123';
    let output;
    output = IntegerParser.parse(input);
    console.log(output);
}

function test_abnormal_1() {
    let input = 'a';
    let output;
    output = IntegerParser.parse(input);
    console.log('--------');
    console.log(output);
}

test_normal_1();
// test_abnormal_1();