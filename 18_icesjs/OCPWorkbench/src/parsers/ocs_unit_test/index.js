import peg from 'pegjs';
import LogTool from "./tools/LogTool";
import DebugTool from "./tools/DebugTool";
const fs = require('fs');
const assert = require('assert').strict;
const colors = require('colors');

function assert_equal(parser, input, expected) {
  // @see https://stackoverflow.com/a/1535650
  if (typeof assert_equal.counter == 'undefined') {
    assert_equal.counter = 0;
  }

  let counter = ++assert_equal.counter;
  let output;
  try {
    output = parser.parse(input);
    assert.equal(output, expected, `expected '${expected}', but output is '${output}'`);
    let success = `Case ${counter}: ${input}\n> Passed`;
    console.log(success.green);
  }
  catch (e) {
    if (e instanceof parser.SyntaxError) {
      output = `Case ${counter}: ${input}\n> Parse Error: ${e.message}`;
    }
    else {
      output = `Case ${counter}: ${input}\n> Assert Error: ${e.message}`;
    }
    console.log(output.red);
  }
}

function test_type_encoding() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let parser;
    let input;

    // @see https://melvingeorge.me/blog/get-all-the-contents-from-file-as-string-nodejs
    const buffer = fs.readFileSync('./type_encoding.pegjs');
    const grammar = buffer.toString();
    parser = peg.generate(grammar);

    // Case 1
    input = 'float2';
    assert_equal(parser, input, 'f')

    // Case 2
    input = 'float';
    assert_equal(parser, input, 'f')

    // Case 3
    input = 'double';
    assert_equal(parser, input, 'd')
}

test_type_encoding();

