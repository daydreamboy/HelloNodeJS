import LogTool from './LogTool'

const assert = require('assert').strict;
const colors = require('colors');

const assert_equal = (parser, input, expected, resetCounter = false) => {
  assert_equal_x(parser, input, expected, false, resetCounter)
}

const assert_deepEqual = (parser, input, expected, resetCounter = false) => {
  assert_equal_x(parser, input, expected, true, resetCounter)
}

const assert_equal_x = (parser, input, expected, deepEqual = false, resetCounter = false) => {
  // @see https://stackoverflow.com/a/1535650
  if (typeof assert_equal_x.count == 'undefined' || resetCounter) {
    assert_equal_x.count = 0;
  }

  if (typeof assert_equal_x.successCount == 'undefined' || resetCounter) {
    assert_equal_x.successCount = 0;
  }

  if (typeof assert_equal_x.failureCount == 'undefined' || resetCounter) {
    assert_equal_x.failureCount = 0;
  }

  let counter = ++assert_equal_x.count;
  let output;
  try {
    output = parser.parse(input);
    if (deepEqual) {
      assert.deepEqual(output, expected, `expected '${expected}', but output is '${output}'`);
    }
    else {
      assert.equal(output, expected, `expected '${expected}', but output is '${output}'`);
    }
    let success = `Case ${counter}: ${input}\n> Passed`;
    console.log(success.green);

    ++assert_equal_x.successCount;
  }
  catch (e) {
    if (e instanceof parser.SyntaxError) {
      output = `Case ${counter}: ${input}\n> Parse Error: ${e.message}`;
    }
    else {
      output = `Case ${counter}: ${input}\n> Assert Error: ${e.message}`;
    }
    console.log(output.red);

    ++assert_equal_x.failureCount;
  }
}

const assert_equal_summary = () => {
  LogTool.v(`Summary: ${assert_equal_x.count} cases, `.blue +
    `${assert_equal_x.successCount} successes`.green +
    ', '.blue +
    (assert_equal_x.failureCount ? `${assert_equal_x.failureCount} failures`.red : `${assert_equal_x.failureCount} failures`.green));
}

export {assert_equal, assert_deepEqual, assert_equal_summary};
