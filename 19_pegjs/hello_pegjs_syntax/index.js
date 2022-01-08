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

    // Case 2
    input = '';
    try {
        output = parser.parse(input);
    }
    catch (e) {
        output = e.message;
    }
    console.log(output);

    // Group 2
    grammar = 'start = [a-z] +';
    parser = peg.generate(grammar);

    // Case 3
    input = 'hello';
    output = parser.parse(input);
    console.log(output);
}

function test_expression_match_zero_or_one() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = "hello" ?';
    parser = peg.generate(grammar);

    // Case 1
    input = 'hello';
    output = parser.parse(input);
    console.log(output);

    // Case 2
    input = '';
    output = parser.parse(input);
    console.log(output);
}

function test_expression_$_expression() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = $ "hello"';
    parser = peg.generate(grammar);

    // Case 1
    input = 'hello';
    output = parser.parse(input);
    console.log(output);

    // Case 2
    input = '';
    try {
        output = parser.parse(input);
    }
    catch (e) {
        output = e.message;
    }
    console.log(output);

    // Group 2
    grammar = 'start = $( \'0x\' [a-fA-F0-9]+ )';
    parser = peg.generate(grammar);

    // Case 3
    input = '0x123';
    output = parser.parse(input);
    console.log(output); // 0x123

    // Group 3
    grammar = 'start = \'0x\' [a-fA-F0-9]+';
    parser = peg.generate(grammar);

    // Case 4
    input = '0x123';
    output = parser.parse(input);
    console.log(output); // [ '0x', [ '1', '2', '3' ] ]
}

function test_expression_and_sign_expression() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = &"{" code_block; code_block = "{" [^{}]+ "}"';
    parser = peg.generate(grammar);

    // Case 1
    input = '{a}';
    output = parser.parse(input);
    console.log(output);
}

function test_action_block() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = digits:[0-9]+ { return parseInt(digits.join(""), 10); }';
    parser = peg.generate(grammar);

    // Case 1
    input = '1234';
    output = parser.parse(input);
    console.log(output); // 1234

    // Group 2
    grammar = 'start = digits:[0-9]+';
    parser = peg.generate(grammar);

    // Case 2
    input = '1234';
    output = parser.parse(input);
    console.log(output); // [ '1', '2', '3', '4' ]
}

function test_action_block_optional_label() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = 'start = minus:(\'-\')? digits:[0-9]+ { console.log(\'debug: \' + minus); return (minus ? -1 : 1) * parseInt(digits.join(""), 10); }';
    parser = peg.generate(grammar);

    // Case 1
    input = '1';
    output = parser.parse(input);
    console.log(output); // 1234

    // Case 2
    input = '-2';
    output = parser.parse(input);
    console.log(output); // -2
}

function test_action_block_location_function() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = String.raw`
start = string:$(.+) {
  let result = parseFloat(string);
  if (isNaN(result)) {
      let loc = location();
      let startIndexInfo = 'start: offset: ' + loc.start.offset + ',line: ' + loc.start.line + ', column: ' + loc.start.column
      let endIndexInfo = 'end: offset: ' + loc.end.offset + ',line: ' + loc.end.line + ', column: ' + loc.end.column
      console.log(startIndexInfo);
      console.log(endIndexInfo);
        
      return undefined
  }
  else {
      return result
  }
}
`;
    parser = peg.generate(grammar);

    // Case 1
    input = 'abcd';
    output = parser.parse(input);
    console.log(output);
}

function test_action_block_expected_function() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = String.raw`
start = string:$(.+) {
  let result = parseFloat(string);
  if (isNaN(result)) {
      expected("a numeric string")
  }
  else {
      return result
  }
}
`;
    parser = peg.generate(grammar);

    // Case 1
    input = 'a';
    try {
        output = parser.parse(input);
    }
    catch (e) {
        output = e.message;
    }
    console.log(output);

    // Group 2
    grammar = String.raw`
start = string:$(.+) {
  let result = parseFloat(string);
  if (isNaN(result)) {
    let loc = {
      start: { offset: 1, line: 2, column: 3 },
      end: { offset: 4, line: 5, column: 6 },
    };
    expected("a numeric string", loc)
  }
  else {
    return result
  }
}
`;
    parser = peg.generate(grammar);

    // Case 1
    input = 'a';
    try {
        output = parser.parse(input);
    }
    catch (e) {
        output = e.message + '\n' + JSON.stringify(e.location);
    }
    console.log(output);
}

function test_action_block_error_function() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let grammar;
    let parser;
    let output;
    let input;

    // Group 1
    grammar = String.raw`
start = string:$(.+) {
  let result = parseFloat(string);
  if (isNaN(result)) {
      error("a numeric string")
  }
  else {
      return result
  }
}
`;
    parser = peg.generate(grammar);

    // Case 1
    input = 'a';
    try {
        output = parser.parse(input);
    }
    catch (e) {
        output = e.message;
    }
    console.log(output);

    // Group 2
    grammar = String.raw`
start = string:$(.+) {
  let result = parseFloat(string);
  if (isNaN(result)) {
    let loc = {
      start: { offset: 1, line: 2, column: 3 },
      end: { offset: 4, line: 5, column: 6 },
    };
    error("a numeric string", loc)
  }
  else {
    return result
  }
}
`;
    parser = peg.generate(grammar);

    // Case 1
    input = 'a';
    try {
        output = parser.parse(input);
    }
    catch (e) {
        output = e.message + '\n' + JSON.stringify(e.location);
    }
    console.log(output);
}

test_literal();
test_character_collection();
test_subexpression();
test_expression_match_zero_or_more();
test_expression_match_one_or_more();
test_expression_match_zero_or_one();
test_expression_$_expression();
test_expression_and_sign_expression();
test_action_block();
test_action_block_optional_label();
test_action_block_location_function();
test_action_block_expected_function();
test_action_block_error_function();

