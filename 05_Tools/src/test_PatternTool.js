import PatternTool from "../library/PatternTool";
import LogTool from "../library/LogTool";
import DebugTool from "../library/DebugTool";
import StringTool from "../library/StringTool";

const assert = require('assert').strict;

function test_captureBalancedMarkedString() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let input = "some text(text here(possible text)text(possible text(more text)))end text";
    let output;

    // Case 1
    console.log(`original string: ${input}`)
    output = PatternTool.captureBalancedMarkedString(input, '(', ')', false);
    console.log(output);
    assert.deepEqual(output, [ 'text here(possible text)text(possible text(more text))' ], 'not equal');

    output = PatternTool.captureBalancedMarkedString(input, '(', ')', true);
    console.log(output);
    assert.deepEqual(output, [ '(text here(possible text)text(possible text(more text)))' ], 'not equal');

    // Case 2
    input = '- (void)presentViewController:(UIViewController *)viewControllerToPresent animated:(BOOL)flag completion:(void (^)(void))completion;';
    console.log(`original string: ${input}`)
    output = PatternTool.captureBalancedMarkedString(input, '(', ')');
    console.log(output);
    assert.deepEqual(output, [ 'void', 'UIViewController *', 'BOOL', 'void (^)(void)' ], 'not equal');

    // Case 3: (void (^)(void)))
    input = '- (void)presentViewController:(UIViewController *)viewControllerToPresent animated:(BOOL)flag completion:(void (^)(void)))completion;';
    console.log(`original string: ${input}`)
    output = PatternTool.captureBalancedMarkedString(input, '(', ')');
    console.log(output);
    assert.deepEqual(output, [ 'void', 'UIViewController *', 'BOOL', 'void (^)(void)' ], 'not equal');

    // Case 4: customized start/end markers
    input = 'test customized start/end markers xyz';
    console.log(`original string: ${input}`)
    output = PatternTool.captureBalancedMarkedString(input, 'c', 'z');
    console.log(output);
    assert.deepEqual(output, [ 'ustomi' ], 'not equal');

    // Abnormal Case 1: start marker is more than end marker
    input = 'This is ( This is ( a test) some';
    console.log(`original string: ${input}`)
    output = PatternTool.captureBalancedMarkedString(input, '(', ')');
    console.log(output);
    assert.deepEqual(output, [ ], 'not equal');

    // Abnormal Case 2: start marker is less than end marker, but it's ok : 😁 end: 😭
    input = 'This is ( This is ( a test) some) a )';
    console.log(`original string: ${input}`)
    output = PatternTool.captureBalancedMarkedString(input, '(', ')');
    console.log(output);
    assert.deepEqual(output, [ ' This is ( a test) some' ], 'not equal');

    // Abnormal Case 3: the string or markers include emoji
    input = 'This is ( This 😁 is ( a test) 😁) a )';
    console.log(`original string: ${input}`)
    output = PatternTool.captureBalancedMarkedString(input, '😁', '😭');
    console.log(output);
    assert.deepEqual(output, [ ], 'not equal');
}

function test_parse_oc_method_signature() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);
    let output;

    // Case 1
    let input = "- (void)presentViewController : (UIViewController *) viewControllerToPresent animated:(BOOL)flag completion:(void (^)(void))completion ";
    output = PatternTool.parseOCMethodSignature(input);
    console.log(output)

    // Case 2
    input = "(void)presentViewController ";
    output = PatternTool.parseOCMethodSignature(input);
    console.log(output)

    // Case 3
    input = "(void)presentViewControllerWithCompletion : (void (^)(void)) completion  ";
    output = PatternTool.parseOCMethodSignature(input);
    console.log(output)

    // Case 3
    input = String.raw`
 - (void (^)(void)) presentViewController : (UIViewController *) viewControllerToPresent
                     animated : (BOOL) flag
                   completion : (void (^)(void))completion
`;
    output = PatternTool.parseOCMethodSignature(input);
    console.log(output)
    console.log('---------')

    // Case 4
    input = String.raw`
 - (void (^)(void)) presentViewController : (UIViewController *)
                     animated : (BOOL)
                   completion : (void (^)(void))completion
`;
    output = PatternTool.parseOCMethodSignature(input);
    console.log(output)
}

function run() {
    LogTool.d('*** PatternTool testing ***')
    test_captureBalancedMarkedString();
    test_parse_oc_method_signature();
}

export { run };
