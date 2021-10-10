//import IntegerParser from '../pegjs/integer-parser';

let peg = require('pegjs');

function test_normal_1() {
    let parser = peg.generate("start = integer; integer = digits:[0-9]* { return digits.join('') }");

    let input = '123';
    let output;

    output = parser.parse(input);
    console.log(output);
}

function test_abnormal_1() {
    let parser = peg.generate("start = integer; integer = digits:[0-9]* { return digits.join('') }");

    let input = 'a';
    let output;
    output = parser.parse(input);
    console.log('--------');
    console.log(output);
}

test_normal_1();
test_abnormal_1();