import peg from 'pegjs';
import LogTool from "./tools/LogTool";
import DebugTool from "./tools/DebugTool";
const fs = require('fs');
const assert = require('assert').strict;
const colors = require('colors');

const assert_equal = (parser, input, expected, resetCounter = false) => {
  // @see https://stackoverflow.com/a/1535650
  if (typeof assert_equal.counter == 'undefined' || resetCounter) {
    assert_equal.counter = 0;
  }

  if (typeof assert_equal.successCount == 'undefined' || resetCounter) {
    assert_equal.successCount = 0;
  }

  if (typeof assert_equal.failureCount == 'undefined' || resetCounter) {
    assert_equal.failureCount = 0;
  }

  let counter = ++assert_equal.counter;
  let output;
  try {
    output = parser.parse(input);
    assert.equal(output, expected, `expected '${expected}', but output is '${output}'`);
    let success = `Case ${counter}: ${input}\n> Passed`;
    console.log(success.green);

    ++assert_equal.successCount;
  }
  catch (e) {
    if (e instanceof parser.SyntaxError) {
      output = `Case ${counter}: ${input}\n> Parse Error: ${e.message}`;
    }
    else {
      output = `Case ${counter}: ${input}\n> Assert Error: ${e.message}`;
    }
    console.log(output.red);

    ++assert_equal.failureCount;
  }
}

const assert_equal_summary = () => {
  LogTool.v(`Summary: `.blue +
    `${assert_equal.successCount} successes`.green +
    ', '.blue +
    (assert_equal.failureCount ? `${assert_equal.failureCount} failures`.red : `${assert_equal.failureCount} failures`.green));
}

const test_type_encoding = () => {
  LogTool.v(`--- Testing ${DebugTool.currentFunctionName()} ---`);

  let input;

  // @see https://melvingeorge.me/blog/get-all-the-contents-from-file-as-string-nodejs
  const buffer = fs.readFileSync('./type_encoding.pegjs');
  const grammar = buffer.toString();
  const parser = peg.generate(grammar);

  // Group 1: Scalar C types
  // signed integer types
  input = 'char';
  assert_equal(parser, input, 'c');

  input = 'short';
  assert_equal(parser, input, 's');

  input = 'int';
  assert_equal(parser, input, 'i');

  input = 'long';
  assert_equal(parser, input, 'q');

  input = 'long long';
  assert_equal(parser, input, 'q');

  // unsigned integer types
  input = 'unsigned char';
  assert_equal(parser, input, 'C')

  input = 'unsigned short';
  assert_equal(parser, input, 'S');

  input = 'unsigned int';
  assert_equal(parser, input, 'I');

  input = 'unsigned long';
  assert_equal(parser, input, 'Q');

  input = 'unsigned long long';
  assert_equal(parser, input, 'Q');

  // float types
  input = 'float';
  assert_equal(parser, input, 'f');

  input = 'double';
  assert_equal(parser, input, 'd');

  input = 'long double';
  assert_equal(parser, input, 'D');

  // unsigned integer types
  input = 'void';
  assert_equal(parser, input, 'v');

  // other C types
  input = 'size_t';
  assert_equal(parser, input, 'Q');

  // pointer type
  input = 'void *';
  assert_equal(parser, input, '^v');

  input = 'void   *';
  assert_equal(parser, input, '^v');

  // Group 2: Objective-C Scalar types
  input = 'BOOL';
  assert_equal(parser, input, 'B');

  input = 'NSInteger';
  assert_equal(parser, input, 'q');

  input = 'NSUInteger';
  assert_equal(parser, input, 'Q');

  input = 'CGFloat';
  assert_equal(parser, input, 'd');

  input = 'CGFloat';
  assert_equal(parser, input, 'd');

  assert_equal_summary();
  LogTool.v(`--- Finish Testing ${DebugTool.currentFunctionName()} ---`);
}

test_type_encoding();

