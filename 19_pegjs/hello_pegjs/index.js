// This for testing PEG.js syntax

function test_hello_world() {
    // example from https://nathanpointer.com/blog/introToPeg/
    let peg = require("pegjs");
    let grammar = "start = ('a' / 'b')+";
    let parser = peg.generate(grammar);

    let output = parser.parse("abba"); // returns ["a", "b", "b", "a"]
    console.log(output);
}

function test_formatting() {
    // example from https://nathanpointer.com/blog/introToPeg/
    let peg = require("pegjs");
    let grammar = "start = integer; integer = digits:[0-9]* { return digits.join('') }";
    let parser = peg.generate(grammar);

    let output = parser.parse("124"); // returns ["a", "b", "b", "a"]
    console.log(output);
}

test_hello_world();
test_formatting();
