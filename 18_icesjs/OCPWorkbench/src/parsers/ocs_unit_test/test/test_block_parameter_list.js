import LogTool from '../tools/LogTool';
import DebugTool from '../tools/DebugTool';
import {assert_equal, assert_deepEqual, assert_equal_summary} from '../tools/AssertTool';
import peg from "pegjs";
const fs = require('fs');

const test_block_parameter_list = () => {
  LogTool.v(`--- Testing ${DebugTool.currentFunctionName()} ---`);

  let input;

  const buffer = fs.readFileSync('./block_parameter_list.pegjs');
  const grammar = buffer.toString();
  const parser = peg.generate(grammar);

  // Group 1: number literal
  // integer
  input = '(int a)';
  assert_deepEqual(parser, input, [
    {
      type: "i",
      name: "a"
    }
  ], true);

  assert_equal_summary();
  LogTool.v(`--- Finish Testing ${DebugTool.currentFunctionName()} ---`);
}

export default test_block_parameter_list;
