import DebugTool from '../library/DebugTool';
import LogTool from "../library/LogTool";

function test_inspectValue() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);
    let a = true;
    console.log(DebugTool.inspectValue(a));

    let b = new Boolean('1');
    console.log(DebugTool.inspectValue(b));

    let c = 1;
    console.log(DebugTool.inspectValue(c));

    let d = 1;
    console.log(DebugTool.inspectValue(d, 'd'));
}

function test_currentFunctionName() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    console.log(DebugTool.currentFunctionName());
    console.log(DebugTool.currentFunctionName());
}

function test_dump() {
    LogTool.v(`--- ${DebugTool.currentFunctionName()} ---`);

    let x;
    console.log(`debug: ${DebugTool.dump({x}, false)}`);

    x = null;
    DebugTool.dump({x}); // "object"

    x = true;
    DebugTool.dump({x}); // "boolean"

    x = 10;
    DebugTool.dump({x}); // "number"

    x = "abc";
    DebugTool.dump({x}); // "string"

    x = 9007199254740991n;
    DebugTool.dump({x}); // "bigint"

    x = Symbol("id");
    DebugTool.dump({x}); // "symbol"

    x = {a: 1};
    DebugTool.dump({x}); // "object"

    x = ['b', 2];
    DebugTool.dump({x}); // "object"

    x = ['c', setTimeout];
    DebugTool.dump({x}); // "object"

    x = Math;
    DebugTool.dump({x}); // "object"

    x = JSON;
    DebugTool.dump({x}); // "object"

    x = setTimeout;
    DebugTool.dump({x}); // "function"
}

function run() {
    LogTool.d('*** DebugTool testing ***')
    test_inspectValue();
    test_currentFunctionName();
    test_dump();
}

export { run };
