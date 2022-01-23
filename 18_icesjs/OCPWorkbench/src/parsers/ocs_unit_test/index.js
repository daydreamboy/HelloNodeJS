import peg from 'pegjs';
import LogTool from "./tools/LogTool";
import DebugTool from "./tools/DebugTool";
import test_type_encoding from './test/test_type_encoding'
import test_literal_type from './test/test_literal_type'
import test_block_parameter_list from './test/test_block_parameter_list'

test_type_encoding();
test_literal_type();
test_block_parameter_list();
