import LogTool from '../tools/LogTool';
import DebugTool from '../tools/DebugTool';
import {assert_equal, assert_equal_summary} from '../tools/AssertTool';
import peg from "pegjs";
const fs = require('fs');

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

  // signed integer pointer types
  input = 'char *';
  assert_equal(parser, input, '*');

  input = 'short *';
  assert_equal(parser, input, '^s');

  input = 'int *';
  assert_equal(parser, input, '^i');

  input = 'long *';
  assert_equal(parser, input, '^q');

  input = 'long long *';
  assert_equal(parser, input, '^q');

  // unsigned integer pointer types
  input = 'unsigned char *';
  assert_equal(parser, input, '*');

  input = 'unsigned short *';
  assert_equal(parser, input, '^S');

  input = 'unsigned int *';
  assert_equal(parser, input, '^I');

  input = 'unsigned long *';
  assert_equal(parser, input, '^Q');

  input = 'unsigned long long *';
  assert_equal(parser, input, '^Q');

  // Group 2: Objective-C Scalar types
  input = 'BOOL';
  assert_equal(parser, input, 'B');

  input = 'NSInteger';
  assert_equal(parser, input, 'q');

  input = 'NSUInteger';
  assert_equal(parser, input, 'Q');

  input = 'CGFloat';
  assert_equal(parser, input, 'd');

  input = 'Class';
  assert_equal(parser, input, '#');

  input = 'id';
  assert_equal(parser, input, '@');

  input = 'SEL';
  assert_equal(parser, input, ':');

  input = 'IMP';
  assert_equal(parser, input, '^?');

  input = 'Tests_typeEncoding*';
  assert_equal(parser, input, '@');

  input = 'Tests_typeEncoding *';
  assert_equal(parser, input, '@');

  input = 'NSRange';
  assert_equal(parser, input, '{_NSRange=QQ}');

  input = 'CGSize';
  assert_equal(parser, input, '{CGSize=dd}');

  input = 'CGPoint';
  assert_equal(parser, input, '{CGPoint=dd}');

  input = 'CGRect';
  assert_equal(parser, input, '{CGRect={CGPoint=dd}{CGSize=dd}}');

  input = 'UIEdgeInsets';
  assert_equal(parser, input, '{UIEdgeInsets=dddd}');

  assert_equal_summary();
  LogTool.v(`--- Finish Testing ${DebugTool.currentFunctionName()} ---`);
}

export default test_type_encoding;
