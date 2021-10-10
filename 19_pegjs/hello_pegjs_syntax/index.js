import peg from 'pegjs';
import LogTool from "./tools/LogTool";
import DebugTool from "./tools/DebugTool";

function test_literal() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = "hello"'
    parser = peg.generate(grammar);

    // Case 1
    input = 'hello';
    output = parser.parse(input);
    console.log(output);

    // Case 2
    input = 'hello, world';
    try {
        output = parser.parse(input);
    }
    catch (e) {
        if (e instanceof parser.SyntaxError) {
            // ...
        } else {
            // ...
        }
        output = e.message;
    }
    console.log(output);

    // Group 2
    grammar = 'start = "hello"i'
    parser = peg.generate(grammar);

    // Case 3
    input = 'Hello';
    output = parser.parse(input);
    console.log(output);
}

function test_character_collection() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = [a-z]';
    parser = peg.generate(grammar);

    // Case 1
    input = 'p';
    output = parser.parse(input);
    console.log(output);

    // Case 2
    input = 'peg';
    try {
        output = parser.parse(input);
    }
    catch (e) {
        if (e instanceof parser.SyntaxError) {
            // ...
        } else {
            // ...
        }
        output = e.message;
    }
    console.log(output);

    // Group 2
    grammar = 'start = [^a-z]';
    parser = peg.generate(grammar);

    // Case 3
    input = '1';
    output = parser.parse(input);
    console.log(output);
}

function test_subexpression() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = [^w, ]+ comma space ("w".*); space = [ ]; comma = [,]';
    parser = peg.generate(grammar);

    // Case 1
    input = 'hello, world';
    output = parser.parse(input);
    console.log(output);
}

function test_expression_match_zero_or_more() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = "hello" *';
    parser = peg.generate(grammar);

    // Case 1
    input = 'hellohello';
    output = parser.parse(input);
    console.log(output);

    // Case 2
    input = '';
    output = parser.parse(input);
    console.log(output);
}

function test_expression_match_one_or_more() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = "hello" +';
    parser = peg.generate(grammar);

    // Case 1
    input = 'hello';
    output = parser.parse(input);
    console.log(output);

    // Group 1
    grammar = 'start = [a-z] +';
    parser = peg.generate(grammar);

    // Case 2
    input = 'hello';
    output = parser.parse(input);
    console.log(output);
}

function test_expression_return_null_if_not_match() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = & ([a-z])';
    parser = peg.generate(grammar);

    // Case 1
    // input = 'h';
    // output = parser.parse(input);
    // console.log(output);

    // Case 2
    // input = '';
    // output = parser.parse(input); // should return undefined, but throws exception
    // console.log(output);

    // grammar = 'start = ([a-z]) ? [0-9]';
    // parser = peg.generate(grammar);
    //
    // // Case 2
    // input = 'aa';
    // output = parser.parse(input); // should return undefined, but throws exception
    // console.log(output);
}

test_literal();
test_character_collection();
test_subexpression();
test_expression_match_zero_or_more();
test_expression_match_one_or_more();
test_expression_return_null_if_not_match();
