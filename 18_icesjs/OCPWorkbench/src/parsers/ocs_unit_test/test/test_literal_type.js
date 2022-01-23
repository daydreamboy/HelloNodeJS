import LogTool from '../tools/LogTool';
import DebugTool from '../tools/DebugTool';
import {assert_equal, assert_deepEqual, assert_equal_summary} from '../tools/AssertTool';
import peg from "pegjs";
const fs = require('fs');

const test_literal_type = () => {
  LogTool.v(`--- Testing ${DebugTool.currentFunctionName()} ---`);

  let input;

  const buffer = fs.readFileSync('./literal_type.pegjs');
  const grammar = buffer.toString();
  const parser = peg.generate(grammar);

  // Group 1: number literal
  // integer
  input = '123';
  assert_deepEqual(parser, input, {
    literal: 123
  }, true);

  input = '0x10';
  assert_deepEqual(parser, input, {
    literal: '0x10'
  });

  // float
  input = '3.14';
  assert_deepEqual(parser, input, {
    literal: 3.14
  });

  // Group 2: string literal
  input = '\"string\"';
  assert_deepEqual(parser, input, {
    literal: "string"
  });

  input = '\'string\'';
  assert_deepEqual(parser, input, {
    literal: "string"
  });

  input = '@"oc string"';
  assert_deepEqual(parser, input, {
    literal: "oc string"
  });

  // Group 3: boolean literal
  input = 'YES';
  assert_deepEqual(parser, input, {
    literal: true
  });

  input = 'true';
  assert_deepEqual(parser, input, {
    literal: true
  });

  input = 'NO';
  assert_deepEqual(parser, input, {
    literal: false
  });

  input = 'false';
  assert_deepEqual(parser, input, {
    literal: false
  });

  // Group 4: null
  input = 'null';
  assert_deepEqual(parser, input, {
    literal: null
  });

  input = 'nil';
  assert_deepEqual(parser, input, {
    literal: null
  });

  // Group 5: @selector
  input = '@selector(a)';
  assert_deepEqual(parser, input, {
    literal: 'a'
  });

  assert_equal_summary();
  LogTool.v(`--- Finish Testing ${DebugTool.currentFunctionName()} ---`);
}

export default test_literal_type;
