import {run as run1} from './test_ArrayTool';
import {run as run2} from './test_BooleanTool';
import {run as run3} from './test_JSONTool';
import {run as run4} from './test_NumberTool';
import {run as run5} from './test_ObjectTool';
import {run as run6} from './test_StringTool';
import {run as run7} from './test_DebugTool';
import {run as run8} from './test_PatternTool';

run1();
run2();
run3();
run4();
run5();
run6();
run7();
run8();
console.log('---');
console.log(typeof Math);
console.log(typeof Object);
console.log(Math instanceof Object);
console.log(Math.constructor);
console.log(Object.constructor);
console.log(Date.now());

// Test if needed
/*
import {run_forever} from './test_EventThrottleTool';
run_forever();
 */

