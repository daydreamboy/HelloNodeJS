import peg from 'pegjs';
import LogTool from "../tools/LogTool";
import DebugTool from "../tools/DebugTool";


let fs = require('fs');
let path = require('path');
const assert = require('assert').strict;

// @see https://melvingeorge.me/blog/get-all-the-contents-from-file-as-string-nodejs
function pegjs(relativePath) {
    return fs.readFileSync(path.join(__dirname, relativePath)).toString();
}

function test_float_pegjs() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    grammar = pegjs('./float.pegjs');
    parser = peg.generate(grammar);

    // Case 1
    input = '3.14';
    output = parser.parse(input);
    assert.equal(output, 3.14, 'not equal');

    // Case 2
    input = '-3.14';
    output = parser.parse(input);
    assert.equal(output, -3.14, 'not equal');

    // Case 3
    input = '-.14';
    // @see https://stackoverflow.com/questions/6645559/node-assert-throws-not-catching-exception
    assert.throws(() => { parser.parse(input); }, Error);
}

test_float_pegjs();