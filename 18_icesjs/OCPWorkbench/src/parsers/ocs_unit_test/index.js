import peg from 'pegjs';
import LogTool from "./tools/LogTool";
import DebugTool from "./tools/DebugTool";
import test_type_encoding from './test/test_type_encoding'
import test_literal_type from './test/test_literal_type'

test_type_encoding();
test_literal_type();

